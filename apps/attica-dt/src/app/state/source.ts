import { Injectable } from '@angular/core';
import { Store, createState, withProps, select } from '@ngneat/elf';
import {
  actionsFactory,
  createAction,
  createEffect,
  ofType,
} from '@ngneat/effects';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';
import { v4 as uuid } from 'uuid';
import * as geojson from 'geojson';

export const InitFeature: geojson.Feature = {
  id: uuid(),
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [0, 0],
  },
  properties: {},
};

export interface DTFeatureCollection extends geojson.FeatureCollection {
  id: string;
}

export const InitFeatureCollection: DTFeatureCollection = {
  id: uuid(),
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: uuid(),
      geometry: {
        type: 'Point',
        coordinates: [0, 0],
      },
      properties: {},
    },
  ],
};

interface Source {
  attica_region: geojson.Feature;
  attica_rivers: DTFeatureCollection;
}

const { state, config } = createState(
  withProps<Source>({
    attica_region: InitFeature,
    attica_rivers: InitFeatureCollection,
  })
);

const store = new Store({ state, name: 'sources', config });

export const source_persist = persistState(store, {
  key: 'sources',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class SourceStore {
  attica_region$ = store.pipe(select((state) => state.attica_region));
  attica_rivers$ = store.pipe(select((state) => state.attica_rivers));

  sourceActions = actionsFactory('source');

  updateAtticaRegion(boundary: geojson.Feature) {
    const attica_region: geojson.Feature = {
      ...boundary,
      id: 'attica-region-boundary',
    };
    store.update((state) => ({ ...state, ...attica_region }));
  }

  updateAtticaRivers(rivers: DTFeatureCollection) {
    const attica_rivers: DTFeatureCollection = {
      ...rivers,
      id: 'attica-rivers',
    };
    store.update((state) => ({ ...state, ...attica_rivers }));
  }
}

@Injectable({ providedIn: 'root' })
export class SourceEffects {
  constructor(private store: SourceStore, private http: HttpClient) {}

  loadAtticaRegionAction = createAction(
    '[Source Effects Action] Load Attica Region'
  );
  loadAtticaRiversAction = createAction(
    '[Source Effects Action] Load Attica Rivers'
  );

  loadAtticaRegionActionEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.loadAtticaRegionAction),
      map(() =>
        this.http.get<geojson.Feature>('/api/multiboundary/attica_region')
      ),
      tap((response) => {
        const subscription = response.subscribe((res) => {
          this.store.updateAtticaRegion(res);
          subscription.unsubscribe();
        });
      })
    )
  );
}
