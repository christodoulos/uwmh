import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';
import * as geojson from 'geojson';
import { find } from 'lodash-es';

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
    id: 'attica-boundary-line',
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
    id: 'attica-boundary-fill',
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
    id: 'attica-rivers',
    type: 'line',
    bbox: [
      22.848511300642798, 37.62036675138182, 24.182549647704207,
      38.36211380168018,
    ],
    paint_line_color: '#00F',
    paint_line_width: 1,
  },
};

type ObjectKey = keyof typeof atticaLayersInit;

const atticaLayers = createStore(
  { name: 'attica-layers' },
  withProps<AtticaLayers>(atticaLayersInit)
);

@Injectable()
export class LayersRepository {
  attica_bbox$ = atticaLayers.pipe(select((state) => state.boundary_line.bbox));
  rivers_bbox$ = atticaLayers.pipe(select((state) => state.rivers.bbox));
  boundary_line$ = atticaLayers.pipe(select((state) => state.boundary_line));
  boundary_fill$ = atticaLayers.pipe(select((state) => state.boundary_fill));
  rivers$ = atticaLayers.pipe(select((state) => state.rivers));

  constructor() {
    find(atticaLayers);
  }

  toggle_layer(state_key: string) {
    const s = atticaLayers
      .pipe(select((state) => state[state_key as ObjectKey]))
      .subscribe((layer) => {
        layer.visible = !layer.visible;
        atticaLayers.update((state) => ({ ...state, ...layer }));
      });
    s.unsubscribe();
  }

  set_layer_visibility(state_key: string, status: boolean) {
    const s = atticaLayers
      .pipe(select((state) => state[state_key as ObjectKey]))
      .subscribe((layer) => {
        layer.visible = status;
        atticaLayers.update((state) => ({ ...state, ...layer }));
      });
    s.unsubscribe();
  }
}
