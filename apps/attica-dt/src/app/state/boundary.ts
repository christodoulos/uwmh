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

interface MultiBoundary {
  desc: string;
  geojson: geojson.Feature;
}

interface Boundaries {
  attica_region: geojson.Feature;
}

export const InitBoundary: geojson.Feature = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [0, 0],
  },
  properties: {},
};

const { state, config } = createState(
  withProps<Boundaries>({
    attica_region: InitBoundary,
  })
);

const store = new Store({ state, name: 'boundaries', config });

export const boundary_persist = persistState(store, {
  key: 'boundaries',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class BoundaryStore {
  attica_region$ = store.pipe(select((state) => state.attica_region));

  updateBoundary(boundary: geojson.Feature) {
    store.update((state) => ({ ...state, ...{ attica_region: boundary } }));
  }
}

@Injectable({ providedIn: 'root' })
export class BoundaryEffects {
  constructor(private store: BoundaryStore, private http: HttpClient) {}

  loadAtticaRegionAction = createAction('Load Attica Region Action');

  boundaryActions = actionsFactory('Boundaries');

  loadAtticaRegionActionEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.loadAtticaRegionAction),
      map(() =>
        this.http.get<MultiBoundary>('/api/multiboundary/attica_region')
      ),
      tap((response) => {
        const subscription = response.subscribe((res) => {
          this.store.updateBoundary(res.geojson);
          subscription.unsubscribe();
        });
      })
    )
  );
}
