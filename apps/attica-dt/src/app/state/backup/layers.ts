import { Injectable } from '@angular/core';
import { Store, createState, withProps, select } from '@ngneat/elf';
import {
  actionsFactory,
  createAction,
  createEffect,
  ofType,
  props,
} from '@ngneat/effects';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { map, Observable, Subscription, tap } from 'rxjs';
import { LngLatBoundsLike, LngLatLike } from 'mapbox-gl';
import { AtticaStore } from './attica';
import { DTFeature, DTFeatureCollection } from '@uwmh/data';

interface DTLayer {
  visible: boolean;
  center?: LngLatLike;
  bounds?: LngLatBoundsLike;
  // sourceObservable: Observable<DTFeature> | Observable<DTFeatureCollection>;
  subscription: Subscription;
  sourceName: string;
  sourceType: 'geojson';
  layerType: 'fill' | 'line';
  fillColor?: string;
  fillOpacity?: number;
  lineColor?: string;
  lineWidth?: number;
}

interface DTLayers {
  atticaRegionBoundary: DTLayer;
  atticaRegionFill: DTLayer;
  atticaRegionRivers: DTLayer;
}

class InitLayers {
  atticaBoundary$ = this.attica.boundary$;
  atticaRivers$ = this.attica.rivers$;
  constructor(private attica: AtticaStore) {}

  layers(): DTLayers {
    return {
      atticaRegionBoundary: {
        visible: true,
        subscription: this.atticaBoundary$.subscribe(),
        sourceName: 'attica-boundary',
        sourceType: 'geojson',
        layerType: 'line',
      },
      atticaRegionFill: {
        visible: true,
        subscription: this.atticaBoundary$.subscribe(),
        sourceName: 'attica-boundary',
        sourceType: 'geojson',
        layerType: 'fill',
      },
      atticaRegionRivers: {
        visible: true,
        subscription: this.atticaRivers$.subscribe(),
        sourceName: 'attica-rivers',
        sourceType: 'geojson',
        layerType: 'line',
      },
    };
  }
}

const attica = new AtticaStore();

const InitDTLayers = new InitLayers(attica).layers();

const { state, config } = createState(withProps<DTLayers>(InitDTLayers));

const store = new Store({ state, name: 'layers', config });

@Injectable({ providedIn: 'root' })
export class LayerStore {
  atticaBoundaryLayer$ = store.pipe(
    select((state) => state.atticaRegionBoundary)
  );
  atticaFillLayer$ = store.pipe(select((state) => state.atticaRegionFill));
  atticaRiversLayer$ = store.pipe(select((state) => state.atticaRegionRivers));
}

@Injectable({ providedIn: 'root' })
export class LayerEffects {
  constructor(private store: LayerStore) {}

  toggleLayerAction = createAction(
    '[Layer] Toggle Layer',
    props<{ layer: DTLayer }>()
  );

  toggleLayerEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.toggleLayerAction),
      map((payload) => payload.layer.visible)
    )
  );
}
