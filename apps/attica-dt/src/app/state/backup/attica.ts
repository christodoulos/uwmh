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
import {
  DTFeature,
  DTFeatureCollection,
  InitDTFeature,
  InitFeatureCollection,
  River,
} from '@uwmh/data';
import { BackendService } from '../../backend.service';
import { map, Subscription, tap } from 'rxjs';

interface Attica {
  boundary: DTFeature;
  rivers: DTFeatureCollection;
}

const { state, config } = createState(
  withProps<Attica>({
    boundary: InitDTFeature,
    rivers: InitFeatureCollection,
  })
);

const store = new Store({ state, name: 'attica', config });

// export const attica_persist = persistState(store, {
//   key: 'attica',
//   storage: localStorageStrategy,
// });

@Injectable({ providedIn: 'root' })
export class AtticaStore {
  boundary$ = store.pipe(select((state) => state.boundary));
  rivers$ = store.pipe(select((state) => state.rivers));

  updateBoundary(boundary: Partial<Attica>) {
    store.update((state) => ({ ...state, ...boundary }));
  }

  updateRivers(rivers: Partial<Attica>) {
    store.update((state) => ({ ...state, ...rivers }));
  }
}

@Injectable({ providedIn: 'root' })
export class AtticaEffects {
  constructor(private store: AtticaStore, private service: BackendService) {}

  loadBoundaryAction = createAction(
    '[Attica] Load Boundary',
    props<{ id: string }>()
  );

  loadRiversAction = createAction(
    '[Attica] Load Rivers',
    props<{ ids: string[] }>()
  );

  atticaActions = actionsFactory('Attica Actions');

  loadAtticaBoundaryEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.loadBoundaryAction),
      map((payload) => this.service.getBoundary(payload.id)),
      tap((boundary$) => {
        const sub: Subscription = boundary$.subscribe((boundary) => {
          this.store.updateBoundary({ boundary });
          sub.unsubscribe();
        });
      })
    )
  );

  loadAtticaRiversEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.loadRiversAction),
      map((payload) =>
        this.service.getRivers(payload.ids).pipe(
          map(
            (rivers$) =>
              ({ type: 'FeatureCollection', features: rivers$ } as {
                type: 'FeatureCollection';
                features: River[];
              })
          )
        )
      ),
      tap((feature_collection$) => {
        const sub: Subscription = feature_collection$.subscribe((rivers) => {
          this.store.updateRivers({ rivers });
          sub.unsubscribe();
        });
      })
    )
  );
}
