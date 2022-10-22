import { Store, createState, withProps, select } from '@ngneat/elf';
import {
  actionsFactory,
  createAction,
  createEffect,
  ofType,
  props,
} from '@ngneat/effects';

import { Injectable } from '@angular/core';
import * as geojson from 'geojson';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

interface Boundaries {
  attica_region: geojson.Feature;
}

const InitBoundary: geojson.Feature = {
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

@Injectable({ providedIn: 'root' })
export class BoundariesRepository {
  attica_region$ = store.pipe(select((state) => state.attica_region));

  updateBoundary(boundary: geojson.Feature) {
    store.update((state) => ({ ...state, ...{ attica_region: boundary } }));
  }
}

@Injectable({ providedIn: 'root' })
export class BoundariesEffects {
  constructor(
    private boundaries: BoundariesRepository,
    private http: HttpClient
  ) {}

  loadAtticaRegionAction = createAction('Load Attica Region Action');

  boundaryActions = actionsFactory('Boundaries');

  loadAtticaRegionActionEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.loadAtticaRegionAction),
      map(() => this.http.get<geojson.Feature[]>('/api/location')),
      tap((response) => {
        const subscription = response.subscribe((res) => {
          if (res.length) this.boundaries.updateBoundary(res[0]);
          subscription.unsubscribe();
        });
      })
    )
  );
}
