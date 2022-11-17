import { Injectable } from '@angular/core';
import { GeoJSONMapSource, Layer } from '@uwmh/data';
import { AnyLayer, LngLatLike, Map, Popup } from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayersRepository, SourcesRepository } from './state';
import { ThreejsLayer } from './helpers';

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
