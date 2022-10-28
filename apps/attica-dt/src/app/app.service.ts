import { Injectable } from '@angular/core';
import { AtticaIndexEffects, AtticaEffects, AtticaIndexStore } from './state';
import { dispatch } from '@ngneat/effects';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  dispatch = dispatch;

  loadAtticaIndexAction = this.attica_index_effects.loadAtticaIndexAction;
  attica_boundary_index$ = this.attica_index_store.boundary$;
  attica_rivers_index$ = this.attica_index_store.rivers$;
  loadAtticaBoundaryAction = this.attica_effects.loadBoundaryAction;
  loadAtticasRiversAction = this.attica_effects.loadRiversAction;

  constructor(
    private attica_index_effects: AtticaIndexEffects,
    private attica_effects: AtticaEffects,
    private attica_index_store: AtticaIndexStore
  ) {
    this.dispatch(this.loadAtticaIndexAction());
    this.attica_boundary_index$.subscribe((id) =>
      this.dispatch(this.loadAtticaBoundaryAction({ id }))
    );
    this.attica_rivers_index$.subscribe((ids) =>
      this.dispatch(this.loadAtticasRiversAction({ ids }))
    );
  }
}
