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
    const s = this.attica_layers.attica_bbox$.subscribe((bbox) => {
      this.map.fitBounds(bbox as mapboxgl.LngLatBoundsLike);
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
}
