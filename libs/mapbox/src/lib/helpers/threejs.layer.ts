import { MercatorCoordinate, Map, LngLatLike } from 'mapbox-gl';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader';
import * as THREE from 'three';
import { v4 } from 'uuid';

export class ThreejsLayer {
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
    // const modelRotate = [Math.PI / 2, 0, 0];
    const modelRotate = [Math.PI / 2, (3 * Math.PI) / 2, 0];

    const modelAsMercatorCoordinate = MercatorCoordinate.fromLngLat(
      this.modelOrigin,
      modelAltitude
    );

    // const modelScale = 2e-8;

    const modelTransform = {
      // translateX: MercatorCoordinate.fromLngLat(this.modelOrigin, modelAltitude)
      //   .x,
      // translateY: MercatorCoordinate.fromLngLat(this.modelOrigin, modelAltitude)
      //   .y,
      // translateZ: MercatorCoordinate.fromLngLat(this.modelOrigin, modelAltitude)
      //   .z,
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      // scale: modelScale,
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    };

    this.customLayer = <mapboxgl.CustomLayerInterface>{
      // id: '3d-model',
      id: v4(),
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
        //   this.modelURL,
        //   ((ifc: any) => {
        //     this.scene.add(ifc.mesh);
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
