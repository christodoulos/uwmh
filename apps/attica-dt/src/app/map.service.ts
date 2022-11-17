import { Injectable } from '@angular/core';
import { GeoJSONMapSource } from '@uwmh/data';
import {
  AnyLayer,
  LngLatLike,
  Map,
  MercatorCoordinate,
  Popup,
} from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
// import { Threebox } from 'threebox-plugin';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayersRepository, SourcesRepository } from './state';
import { Layer } from '@uwmh/data';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader';

@Injectable({
  providedIn: 'root',
})
export class DTMapService {
  map!: Map;
  mapSubject = new BehaviorSubject(this.map);
  geojson_layers$ = this.layers.geojson_layers$;
  custom_3d_layers$ = this.layers.custom_3d_layers$;
  constructor(
    private sources: SourcesRepository,
    private layers: LayersRepository
  ) {}

  all_sources: Observable<GeoJSONMapSource>[] = [
    this.sources.attica_boundary$,
    this.sources.attica_rivers$,
  ];

  async setupMap(map: Map) {
    this.map = map;
    await this.sources.updateAll(); // setup of local state
    this.setupMapboxSources();
    this.setupMapboxLayers();
    this.mapSubject.next(map);
    this.map.on('style.load', () => {
      this.setupMapboxSources();
      this.setupMapboxLayers();
    });
    const popup = new Popup({ closeButton: false });

    const draw = new MapboxDraw({
      displayControlsDefault: true,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true,
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      // defaultMode: 'draw_polygon',
    });
    map.addControl(draw);

    this.map.on('mousemove', (e) => {
      const features = this.map.queryRenderedFeatures(e.point);
      // Limit the number of properties we're displaying for
      // legibility and performance
      const displayProperties = [
        'type',
        'properties',
        'id',
        'layer',
        'source',
        'sourceLayer',
        'state',
      ];

      const displayFeatures = features.map((feat: { [key: string]: any }) => {
        const displayFeat = {} as { [key: string]: any };
        displayProperties.forEach((prop) => {
          displayFeat[prop] = feat[prop];
        });
        return displayFeat;
      });

      if (
        displayFeatures.length &&
        displayFeatures[0]['properties']['type'] === 'plant_nursery'
      ) {
        // console.log(displayFeatures);
        this.map.getCanvas().style.cursor = 'pointer';
        popup
          .setLngLat(e.lngLat)
          .setHTML('<strong>Plant nursery</strong>')
          .addTo(this.map);
      } else {
        this.map.getCanvas().style.cursor = 'default';
        popup.remove();
      }
      // console.log(displayFeatures[0]['properties']);
    });
    this.map.on('mouseleave', () => {
      popup.remove();
    });
    this.map.getCanvas().style.cursor = 'default';
  }

  setupMapboxSources() {
    for (const source$ of this.all_sources) {
      const s = source$.subscribe((source) => {
        if (source && !this.map.getSource(source.id))
          this.map.addSource(source.id, { type: 'geojson', data: source.data });
      });
      s.unsubscribe();
    }
  }

  setupMapboxLayers() {
    // Add GeoJSON Layers
    let s = this.geojson_layers$.subscribe((layers$) => {
      layers$.forEach((layer$) => {
        const s = layer$.subscribe((layer) => {
          this.map.addLayer({
            id: layer.id,
            source: layer.source_id,
            type: layer.type,
            paint: this.layer_paint(layer),
          } as AnyLayer);
          this.map.setLayoutProperty(
            layer.id,
            'visibility',
            layer.layout_visibility ? 'visible' : 'none'
          );
        });
        s.unsubscribe();
      });
    });
    s.unsubscribe();
    // Add 3D custom Layers
    s = this.custom_3d_layers$.subscribe((layers$) => {
      layers$.forEach((layer$) => {
        const s = layer$.subscribe((layer) => {
          const layer_3d = new ThreejsLayer(
            this.map,
            layer.modelOrigin.coordinates as LngLatLike,
            layer.modelUrl
          );
          this.map.addLayer(layer_3d.customLayer, 'waterway-label');
        });
        s.unsubscribe();
      });
    });

    // const lala = new ThreeboxLayer(this.map);
    // this.map.addLayer(lala.customLayer);
  }

  layer_paint(layer: Layer) {
    switch (layer.type) {
      case 'fill':
        return {
          'fill-color': layer.paint_fill_color,
          'fill-opacity': layer.paint_fill_opacity,
        };
      case 'line':
        return {
          'line-color': layer.paint_line_color,
          'line-width': layer.paint_line_width,
        };
    }
    return;
  }
}

class ThreejsLayer {
  camera: THREE.Camera = new THREE.Camera();
  renderer: THREE.WebGLRenderer | undefined;
  scene: THREE.Scene = new THREE.Scene();
  customLayer: mapboxgl.AnyLayer;
  constructor(
    private map: Map,
    private modelOrigin: LngLatLike,
    private modelURL: string
  ) {
    // parameters to ensure the model is georeferenced correctly on the map
    // const modelOrigin = [
    //   23.781372557061157, 37.988260208268386,
    // ] as mapboxgl.LngLatLike; // define explicitly to match MercatorCoordinate types
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0, 0];
    const modelScale = 3e-8;

    const modelTransform = {
      translateX: MercatorCoordinate.fromLngLat(this.modelOrigin, modelAltitude)
        .x,
      translateY: MercatorCoordinate.fromLngLat(this.modelOrigin, modelAltitude)
        .y,
      translateZ: MercatorCoordinate.fromLngLat(this.modelOrigin, modelAltitude)
        .z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelScale,
    };

    this.customLayer = <mapboxgl.CustomLayerInterface>{
      id: '3d-model',
      type: 'custom',
      renderingMode: '3d',
      // source: 'composite',
      // sourceLayer: 'building',
      onAdd: (map: any, gl: any) => {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        // create two lights to illuminate the model
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -200, 200).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 200, 200).normalize();
        this.scene.add(directionalLight2);

        // use three GLTF loader to add 3d model to the scene
        const loader = new GLTFLoader();
        loader.load(
          this.modelURL,
          ((gltf: any) => {
            this.scene?.add(gltf.scene);
          }).bind(this)
        );
        // const loader = new IFCLoader();
        // loader.load(
        //   '/assets/pump.ifc',
        //   ((ifc: any) => {
        //     this.scene?.add(ifc.mesh);
        //   }).bind(this)
        // );

        this.map = map;

        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
        });
        this.renderer.autoClear = false;
      },
      render: (_gl: any, matrix: any) => {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
        );

        const te = this.map.queryTerrainElevation(this.modelOrigin) ?? 1;
        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            // modelTransform.translateZ ?? 1
            te * modelTransform.scale
          )
          .scale(
            new THREE.Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);
        this.camera.projectionMatrix.elements = matrix;
        this.camera.projectionMatrix = m.multiply(l);
        this.renderer?.state.reset();
        this.renderer?.render(this.scene, this.camera);
        this.map.triggerRepaint();
      },
    };
  }
}

// class ThreeboxLayer {
//   customLayer: mapboxgl.CustomLayerInterface;
//   // tb: typeof Threebox;
//   constructor(private map: Map) {
//     // (window as any).tb = this.tb;
//     this.customLayer = <mapboxgl.CustomLayerInterface>{
//       id: '3d-model-lalakis',
//       type: 'custom',
//       renderingMode: '3d',
//       // source: 'composite',
//       // sourceLayer: 'building',
//       onAdd: (map: Map, gl: any) => {
//         // map = this.map;
//         (window as any).tb = new Threebox(map, gl, {
//           defaultLights: true,
//           enableSelectingObjects: true,
//           realSunlight: true,
//           // sky: true,
//           enableRotatingObjects: true,
//           enableTooltips: true,
//         });

//         const options = {
//           type: 'gltf', //'gltf'/'mtl'
//           // obj: 'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf', //model url
//           obj: '/assets/building.gltf',
//           units: 'meters', //units in the default values are always in meters
//           scale: 1,
//           rotation: { x: 90, y: 180, z: 0 }, //default rotation
//           // anchor: 'center',
//         };
//         (window as any).tb.loadObj(options, (model: any) => {
//           model.setCoords([23.781372557061157, 37.988260208268386]);
//           model.addTooltip('A radar in the middle of nowhere', true);
//           (window as any).tb.add(model);
//           model.castShadow = true;
//           (window as any).tb.lights.dirLight.target = model;
//         });

//         // (window as any).tb.getSunPosition(
//         //   new Date(),
//         //   [23.781372557061157, 37.988260208268386]
//         // );

//         // instantiate a red sphere and position it at the origin lnglat
//         // const sphere = (window as any).tb
//         //   .sphere({ material: 'MeshToonMaterial' })
//         //   .setCoords([23.781372557061157, 37.988260208268386, 0]);
//         // sphere.addEventListener('ObjectMouseOver', onObjectMouseOver, false);
//         // sphere.addEventListener('ObjectMouseOut', onObjectMouseOut, false);
//         // add sphere to the scene
//         // (window as any).tb.add(sphere);
//       },
//       render: (gl, matrix) => {
//         (window as any).tb.setSunlight(
//           new Date(),
//           [23.781372557061157, 37.988260208268386]
//         ); //set Sun light for the given datetime and lnglat
//         // let dupDate = new Date(date.getTime()); // dup the date to avoid modify the original instance
//         // let dateTZ = new Date(dupDate.toLocaleString("en-US", { timeZone: 'Australia/Sydney' }));
//         // hour.innerHTML = "Sunlight on date/time: " + dateTZ.toLocaleString();
//         (window as any).tb.update();
//         // this.map.resize();
//       },
//     };
//   }
// }
