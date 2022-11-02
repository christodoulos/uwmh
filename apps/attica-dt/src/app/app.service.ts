import { Injectable } from '@angular/core';
import {
  GeoJSONMapSource,
  Layer,
  LayersRepository,
  LayerType,
  SourcesRepository,
} from './state';
import { AnyLayer, Map } from 'mapbox-gl';
import { Observable } from 'rxjs';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  map!: Map;
  constructor(
    private attica_sources: SourcesRepository,
    private attica_layers: LayersRepository
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
  }

  async setupSources() {
    for (const source$ of this.sources) {
      const s = source$.subscribe((source) => {
        if (source)
          this.map.addSource(source.id, { type: 'geojson', data: source.data });
      });
      s.unsubscribe();
    }
  }

  show_layers() {
    for (const layer$ of this.layers) {
      const s = layer$.subscribe((layer) => {
        console.log(layer.type);
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
}
