import { Injectable } from '@angular/core';
import { Store, createState, withProps, select } from '@ngneat/elf';
import {
  actionsFactory,
  createAction,
  createEffect,
  dispatch,
  ofType,
} from '@ngneat/effects';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { v4 as uuid } from 'uuid';
import { tap } from 'rxjs';

import { BoundaryEffects, BoundaryStore } from './boundary';
import { RiverEffects } from './multiline';

interface DTLayer {
  id: string;
  type:
    | 'fill'
    | 'line'
    | 'symbol'
    | 'circle'
    | 'heatmap'
    | 'fill-extrusion'
    | 'raster'
    | 'hillshade'
    | 'background'
    | 'sky';
  source: string;
  paint: {
    'fill-color'?: string;
    'fill-opacity'?: number;
    'line-color'?: string;
    'line-width'?: number;
  };
}

const InitDTLayer: DTLayer = {
  id: uuid(),
  type: 'line',
  source: 'whatever',
  paint: {},
};

interface Layers {
  attica_boundaries: DTLayer;
  attica_rivers: DTLayer;
}

const { state, config } = createState(
  withProps<Layers>({
    attica_boundaries: InitDTLayer,
    attica_rivers: InitDTLayer,
  })
);

const store = new Store({ state, name: 'layers', config });

export const layer_persist = persistState(store, {
  key: 'layers',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class LayerStore {
  attica_boundaries$ = store.pipe(select((state) => state.attica_boundaries));
  attica_rivers$ = store.pipe(select((state) => state.attica_rivers));

  updateAtticaBoundariesLayer(layer: DTLayer) {
    store.update((state) => ({ ...state, ...{ attica_boundaries: layer } }));
  }

  updateAtticaRiversLayer(layer: DTLayer) {
    store.update((state) => ({ ...state, ...{ attica_rivers: layer } }));
  }
}

@Injectable({ providedIn: 'root' })
export class LayerEffects {
  constructor(
    private store: LayerStore,
    private boundary_effects: BoundaryEffects,
    private boundary_store: BoundaryStore,
    private river_effects: RiverEffects
  ) {}

  dispatch = dispatch;

  attica_region$ = this.boundary_store.attica_region$;
  loadAtticaRegionAction = this.boundary_effects.loadAtticaRegionAction;
  loadAtticaLayerAction = createAction('Load Attica Layer action');

  loadAtticaRiversAction = this.river_effects.loadAtticaRiversAction;
  loadAtticaRiversLayerAction = createAction('Load Attica Rivers Layer action');

  loadAtticaLayerActionEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.loadAtticaLayerAction),
      tap(() => {
        this.dispatch(this.loadAtticaRegionAction());
      })
    )
  );
}
