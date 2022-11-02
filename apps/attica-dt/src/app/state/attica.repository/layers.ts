import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';
import * as geojson from 'geojson';

export type LayerType =
  | 'background'
  | 'symbol'
  | 'circle'
  | 'fill-extrusion'
  | 'fill'
  | 'heatmap'
  | 'hillshade'
  | 'line'
  | 'raster'
  | 'sky'
  | 'custom';

export interface Layer {
  visible: boolean;
  source_id: string;
  id: string;
  type: string;
  center?: geojson.Point;
  bbox?: geojson.BBox;
  paint_fill_color?: string;
  paint_fill_opacity?: number;
  paint_line_color?: string;
  paint_line_width?: number;
}

interface AtticaLayers {
  boundary_line: Layer;
  boundary_fill: Layer;
  rivers: Layer;
}

const atticaLayersInit: AtticaLayers = {
  boundary_line: {
    visible: true,
    source_id: 'attica-boundary',
    id: 'attica_boundary_line',
    type: 'line',
    center: {
      type: 'Point',
      coordinates: [23.60081445472357, 37.840157656066665],
    },
    bbox: [
      22.890433795328608, 35.82375709947115, 24.1164944580261,
      38.340999434049955,
    ],
    paint_line_color: '#000',
    paint_line_width: 1,
  },
  boundary_fill: {
    visible: true,
    source_id: 'attica-boundary',
    id: 'attica_boundary_fill',
    type: 'fill',
    center: {
      type: 'Point',
      coordinates: [23.60081445472357, 37.840157656066665],
    },
    bbox: [
      22.890433795328608, 35.82375709947115, 24.1164944580261,
      38.340999434049955,
    ],
    paint_fill_color: '#F00',
    paint_fill_opacity: 0.4,
  },
  rivers: {
    visible: false,
    source_id: 'attica-rivers',
    id: 'attica_rivers',
    type: 'line',
    bbox: [
      22.848511300642798, 37.62036675138182, 24.182549647704207,
      38.36211380168018,
    ],
    paint_line_color: '#00F',
    paint_line_width: 1,
  },
};

const atticaLayers = createStore(
  { name: 'attica-layers' },
  withProps<AtticaLayers>(atticaLayersInit)
);

@Injectable()
export class LayersRepository {
  boundary_line$ = atticaLayers.pipe(select((state) => state.boundary_line));
  boundary_fill$ = atticaLayers.pipe(select((state) => state.boundary_fill));
  rivers$ = atticaLayers.pipe(select((state) => state.rivers));
}
