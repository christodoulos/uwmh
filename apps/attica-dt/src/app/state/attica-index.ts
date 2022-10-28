import { Injectable } from '@angular/core';
import { Store, createState, withProps, select } from '@ngneat/elf';
import {
  actionsFactory,
  createAction,
  createEffect,
  ofType,
} from '@ngneat/effects';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { map, Subscription, tap } from 'rxjs';

import { BackendService } from '../backend.service';
import { AtticaIndex } from '@uwmh/data';

const { state, config } = createState(
  withProps<AtticaIndex>({
    boundary: '',
    rivers: [],
  })
);

const store = new Store({ state, name: 'attica-index', config });

// export const atticaIndexPersist = persistState(store, {
//   key: 'attica-index',
//   storage: localStorageStrategy,
// });

@Injectable({ providedIn: 'root' })
export class AtticaIndexStore {
  boundary$ = store.pipe(select((state) => state.boundary));
  rivers$ = store.pipe(select((state) => state.rivers));

  updateAtticaIndex(atticaIndex: AtticaIndex) {
    store.update((state) => ({ ...state, ...atticaIndex }));
  }
}

@Injectable({ providedIn: 'root' })
export class AtticaIndexEffects {
  constructor(
    private store: AtticaIndexStore,
    private service: BackendService
  ) {}

  loadAtticaIndexAction = createAction('[Attica Index] Load Index');

  atticaIndexActions = actionsFactory('Atica Index Actions');

  loadIndexEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.loadAtticaIndexAction),
      map(() => this.service.getAtticaIndex()),
      tap((res) => {
        const sub: Subscription = res.subscribe((data) => {
          this.store.updateAtticaIndex(data);
          sub.unsubscribe();
        });
      })
    )
  );
}
