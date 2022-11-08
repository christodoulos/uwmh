import { Injectable } from '@angular/core';
import { GeoJSONMapSource } from '@uwmh/data';
import { AnyLayer, LngLatLike, Map, MercatorCoordinate } from 'mapbox-gl';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayersRepository, SourcesRepository } from './state';
import { Layer } from '@uwmh/data';
// import { ThreejsLayer } from './layer.service';
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
    this.setupSources();
    this.setupLayers();
    this.mapSubject.next(map);
    this.map.on('style.load', () => {
      this.setupSources();
      this.setupLayers();
    });
  }

  setupSources() {
    for (const source$ of this.all_sources) {
      const s = source$.subscribe((source) => {
        if (source && !this.map.getSource(source.id))
          this.map.addSource(source.id, { type: 'geojson', data: source.data });
      });
      s.unsubscribe();
    }
  }

  setupLayers() {
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
          this.map.addLayer(layer_3d.customLayer);
        });
        s.unsubscribe();
      });
    });
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
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
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
        //     this.scene?.add(ifc);
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

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ ?? 1
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
