import { Map } from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';

class ThreeboxLayer {
  customLayer: mapboxgl.CustomLayerInterface;
  // tb: typeof Threebox;
  constructor(private map: Map) {
    // (window as any).tb = this.tb;
    this.customLayer = <mapboxgl.CustomLayerInterface>{
      id: '3d-model-lalakis',
      type: 'custom',
      renderingMode: '3d',
      // source: 'composite',
      // sourceLayer: 'building',
      onAdd: (map: Map, gl: any) => {
        // map = this.map;
        (window as any).tb = new Threebox(map, gl, {
          defaultLights: true,
          enableSelectingObjects: true,
          realSunlight: true,
          // sky: true,
          enableRotatingObjects: true,
          enableTooltips: true,
        });

        const options = {
          type: 'gltf', //'gltf'/'mtl'
          // obj: 'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf', //model url
          obj: '/assets/building.gltf',
          units: 'meters', //units in the default values are always in meters
          scale: 1,
          rotation: { x: 90, y: 180, z: 0 }, //default rotation
          // anchor: 'center',
        };
        (window as any).tb.loadObj(options, (model: any) => {
          model.setCoords([23.781372557061157, 37.988260208268386]);
          model.addTooltip('A radar in the middle of nowhere', true);
          (window as any).tb.add(model);
          model.castShadow = true;
          (window as any).tb.lights.dirLight.target = model;
        });

        // (window as any).tb.getSunPosition(
        //   new Date(),
        //   [23.781372557061157, 37.988260208268386]
        // );

        // instantiate a red sphere and position it at the origin lnglat
        // const sphere = (window as any).tb
        //   .sphere({ material: 'MeshToonMaterial' })
        //   .setCoords([23.781372557061157, 37.988260208268386, 0]);
        // sphere.addEventListener('ObjectMouseOver', onObjectMouseOver, false);
        // sphere.addEventListener('ObjectMouseOut', onObjectMouseOut, false);
        // add sphere to the scene
        // (window as any).tb.add(sphere);
      },
      render: (gl, matrix) => {
        (window as any).tb.setSunlight(
          new Date(),
          [23.781372557061157, 37.988260208268386]
        ); //set Sun light for the given datetime and lnglat
        // let dupDate = new Date(date.getTime()); // dup the date to avoid modify the original instance
        // let dateTZ = new Date(dupDate.toLocaleString("en-US", { timeZone: 'Australia/Sydney' }));
        // hour.innerHTML = "Sunlight on date/time: " + dateTZ.toLocaleString();
        (window as any).tb.update();
        // this.map.resize();
      },
    };
  }
}
