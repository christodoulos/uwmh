import { Injectable } from '@angular/core';
import { GeoJSONMapSource, Layer, MapWhere } from '@uwmh/data';
import { AnyLayer, LngLatLike, Map, Popup } from 'mapbox-gl';
// import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  LayersRepository,
  SourcesRepository,
  PNWeatherRepository,
  MapWhereRepository,
} from './state';
import { ThreejsLayer } from './helpers';
import { mapQuery } from './helpers/map.query0';
import { debounce } from 'lodash-es';
import { MatDialog } from '@angular/material/dialog';
import { MapInfoComponent } from './dialogs/map-info/map-info.component';

@Injectable({
  providedIn: 'root',
})
export class DTMapService {
  map!: Map;
  popup = new Popup({ closeButton: false });
  mapSubject = new BehaviorSubject(this.map);
  geojson_layers$ = this.layers.geojson_layers$;
  custom_3d_layers$ = this.layers.custom_3d_layers$;
  type$ = this.mapwhere.type$;
  constructor(
    private sources: SourcesRepository,
    private layers: LayersRepository,
    private pnweather: PNWeatherRepository,
    private mapwhere: MapWhereRepository,
    private dialog: MatDialog
  ) {
    this.type$.subscribe((data) => {
      switch (data) {
        case 'plant_nursery':
          this.popup
            .setLngLat([23.781372557061157, 37.988260208268386])
            .setHTML(
              '<strong>Plant nursery</strong> <p>Double click to view available data</p>'
            )
            .addTo(this.map);
          break;

        default:
          this.popup.remove();
          break;
      }
    });
  }

  all_sources: Observable<GeoJSONMapSource>[] = [
    this.sources.attica_boundary$,
    this.sources.attica_rivers$,
  ];

  // recieves the map instance just after its initialization
  async setupMap(map: Map) {
    // hold the map instance for further operations
    this.map = map;
    // set up the local redux state
    await this.sources.updateAll();
    this.setupMapboxSources();
    this.setupMapboxLayers();
    // state is setup, time to next the Map Behaviour Subject
    this.mapSubject.next(map);
    // setup an empty popup, but not display it yet
    const popup = new Popup({ closeButton: false });

    this.map.getCanvas().style.cursor = 'default';

    this.map.on('style.load', () => {
      this.setupMapboxSources();
      this.setupMapboxLayers();
    });

    // const draw = new MapboxDraw({
    //   displayControlsDefault: true,
    //   // Select which mapbox-gl-draw control buttons to add to the map.
    //   controls: {
    //     polygon: true,
    //     trash: true,
    //   },
    //   // Set mapbox-gl-draw to draw by default.
    //   // The user does not have to click the polygon control button first.
    //   // defaultMode: 'draw_polygon',
    // });
    // map.addControl(draw);

    this.map.on(
      'mousemove',
      debounce((e) => this.mapwhere.update(mapQuery(e, map)), 100)
    );

    this.map.on('dblclick', (e) => {
      const s = this.type$.subscribe((data) => {
        if (data == 'plant_nursery') {
          e.preventDefault();
          this.dialog.open(MapInfoComponent);
        }
      });
      s.unsubscribe();
    });
    // this.map.on('mouseleave', () => {
    //   console.log('lala');
    //   popup.remove();
    // });
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
      default:
        return;
    }
  }
}
