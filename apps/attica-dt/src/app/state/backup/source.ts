import { Injectable } from '@angular/core';
import { Store, createState, withProps, select } from '@ngneat/elf';
import {
  actionsFactory,
  createAction,
  createEffect,
  ofType,
} from '@ngneat/effects';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { Subscription, tap } from 'rxjs';
import { Source, sources } from '@uwmh/data';
import { AtticaStore } from './attica';

const { state, config } = createState(withProps<Source>(sources));

const store = new Store({ state, name: 'sources', config });

// export const sourcesPersist = persistState(store, {
//   key: 'sources',
//   storage: localStorageStrategy,
// });

@Injectable({ providedIn: 'root' })
export class SourcesStore {
  atticaBoundary$ = store.pipe(select((state) => state['attica-boundary']));
  atticaRivers$ = store.pipe(select((state) => state['attica-rivers']));

  updateSource(source: Partial<Source>) {
    store.update((state) => ({ ...state, ...source }));
  }
}

@Injectable({ providedIn: 'root' })
export class SourcesEffects {
  // attica selectors
  atticaBoundary$ = this.atticaStore.boundary$;
  atticaRivers$ = this.atticaStore.rivers$;
  constructor(private store: SourcesStore, private atticaStore: AtticaStore) {}

  // actions
  loadAtticaBoundaryAction = createAction('[Sources] Load Attica Boundary');
  loadAtticaRiversAction = createAction('[Sources] Load Attica Rivers');
  sourceActions = actionsFactory('Source Actions');

  // effects
  loadAtticaBoundaryEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.loadAtticaBoundaryAction),
      tap(() => {
        const sub: Subscription = this.atticaBoundary$.subscribe((data) => {
          this.store.updateSource({
            'attica-boundary': {
              id: 'attica-boundary',
              source: { type: 'geojson', data },
            },
          });
        });
        sub.unsubscribe();
      })
    )
  );

  loadAtticaRiversEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.loadAtticaRiversAction),
      tap(() => {
        const sub: Subscription = this.atticaRivers$.subscribe((data) => {
          this.store.updateSource({
            'attica-rivers': {
              id: 'attica-rivers',
              source: { type: 'geojson', data },
            },
          });
        });
        sub.unsubscribe();
      })
    )
  );
}
