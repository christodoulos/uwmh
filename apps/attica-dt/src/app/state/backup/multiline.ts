import { Store, createState, withProps, select } from '@ngneat/elf';
import {
  actionsFactory,
  createAction,
  createEffect,
  ofType,
} from '@ngneat/effects';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';

import { Injectable } from '@angular/core';
import * as geojson from 'geojson';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

interface MultiLine {
  type: string;
  geojson: geojson.Feature;
}

interface Rivers {
  attica_rivers: { type: string; features: geojson.Feature[] };
}

export const InitRivers: geojson.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [0, 0],
      },
      properties: {},
    },
  ],
};

const { state, config } = createState(
  withProps<Rivers>({
    attica_rivers: InitRivers,
  })
);

const store = new Store({ state, name: 'rivers', config });

export const rivers_persist = persistState(store, {
  key: 'rivers',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class RiverStore {
  attica_rivers$ = store.pipe(select((state) => state.attica_rivers));

  updateRivers(rivers: MultiLine[]) {
    const features = [] as geojson.Feature[];
    for (const river of rivers) {
      features.push(river.geojson);
    }
    const attica_rivers = {
      type: 'FeatureCollection',
      features: features,
    };
    store.update((state) => ({
      ...state,
      ...{ attica_rivers: attica_rivers },
    }));
  }
}

@Injectable({ providedIn: 'root' })
export class RiverEffects {
  constructor(private store: RiverStore, private http: HttpClient) {}

  loadAtticaRiversAction = createAction('Load Attica Riveers Action');

  riversActions = actionsFactory('Rivers');

  loadAtticaRiversActionEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.loadAtticaRiversAction),
      map(() => this.http.get<MultiLine[]>('/api/multiline/rivers')),
      tap((response) => {
        const subscription = response.subscribe((res) => {
          this.store.updateRivers(res);
          subscription.unsubscribe();
        });
      })
    )
  );
}