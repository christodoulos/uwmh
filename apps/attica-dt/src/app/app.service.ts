import { Injectable } from '@angular/core';
import {
  GeoJSONMapSource,
  Layer,
  LayersRepository,
  SourcesRepository,
  UIRepository,
} from './state';
import { AnyLayer, Map } from 'mapbox-gl';
import { Observable } from 'rxjs';
import * as mapboxgl from 'mapbox-gl';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  map!: Map;
  constructor(
    private attica_sources: SourcesRepository,
    private attica_layers: LayersRepository,
    private ui: UIRepository
  ) {}

  sources: Observable<GeoJSONMapSource | null>[] = [
    this.attica_sources.boundary$,
    this.attica_sources.rivers$,
  ];

  layers: Observable<Layer>[] = [
    this.attica_layers.boundary_line$,
    this.attica_layers.boundary_fill$,
    this.attica_layers.rivers$,
  ];

  async setupMap(map: Map) {
    this.map = map;
    await this.attica_sources.updateBoundary();
    await this.attica_sources.updateRivers();

    this.setupSources();
    this.show_layers();

    this.map.addLayer(new ThreejsLayer(this.map).customLayer, 'waterway-label');
    console.log(this.map.getStyle().layers);
    // this.map.setLayoutProperty('3d-model', 'visibility', 'visible');

    this.ui.setIsLoading(false);
    this.map.on('styledata', () => {
      this.setupSources();
      this.show_layers();
    });
  }

  async setupSources() {
    for (const source$ of this.sources) {
      const s = source$.subscribe((source) => {
        if (source && !this.map.getSource(source.id))
          this.map.addSource(source.id, { type: 'geojson', data: source.data });
      });
      s.unsubscribe();
    }
  }

  show_layers() {
    for (const layer$ of this.layers) {
      const s = layer$.subscribe((layer) => {
        if (!layer.visible && this.map.getLayer(layer.id))
          this.map.removeLayer(layer.id);
        if (layer.visible && !this.map.getLayer(layer.id))
          this.map.addLayer({
            id: layer.id,
            source: layer.source_id,
            type: layer.type,
            paint: this.layer_paint(layer),
          } as AnyLayer);
      });
      s.unsubscribe();
    }
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

  boundary_zoom() {
    const s = this.attica_layers.attica_center$.subscribe((center) => {
      // this.map.fitBounds(bbox as mapboxgl.LngLatBoundsLike);
      this.map.flyTo({
        center: center?.coordinates as mapboxgl.LngLatLike,
        zoom: 7,
        bearing: 0,
        pitch: 0,
        duration: 3000,
        essential: true,
      });
    });
    s.unsubscribe();
  }

  rivers() {
    const s = this.attica_layers.rivers_bbox$.subscribe((bbox) => {
      // this.attica_layers.toggle_layer('rivers');
      // this.show_layers();
      this.map.fitBounds(bbox as mapboxgl.LngLatBoundsLike);
    });
    s.unsubscribe();
  }

  nursery() {
    this.map.flyTo({
      center: [23.781372557061157, 37.988260208268386],
      zoom: 17,
      bearing: 45,
      pitch: 75,
      duration: 3000,
      essential: true,
    });
  }

  // [23.781372557061157, 37.988260208268386]
}

export class ThreejsLayer {
  camera: THREE.Camera = new THREE.Camera();
  renderer: THREE.WebGLRenderer | undefined;
  scene: THREE.Scene = new THREE.Scene();
  customLayer: mapboxgl.AnyLayer;
  constructor(public map: Map) {
    // parameters to ensure the model is georeferenced correctly on the map
    const modelOrigin = [
      23.781372557061157, 37.988260208268386,
    ] as mapboxgl.LngLatLike; // define explicitly to match MercatorCoordinate types
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0, 0];
    const modelScale = 5.41843220338983e-8;

    const modelTransform = {
      translateX: mapboxgl.MercatorCoordinate.fromLngLat(
        modelOrigin,
        modelAltitude
      ).x,
      translateY: mapboxgl.MercatorCoordinate.fromLngLat(
        modelOrigin,
        modelAltitude
      ).y,
      translateZ: mapboxgl.MercatorCoordinate.fromLngLat(
        modelOrigin,
        modelAltitude
      ).z,
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
          'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
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
      render: (gl: any, matrix: any) => {
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
