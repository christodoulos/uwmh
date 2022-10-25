import { Injectable } from '@angular/core';
import { BoundaryEffects, RiverEffects } from './state';
import { dispatch } from '@ngneat/effects';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  dispatch = dispatch;
  loadAtticaRegionAction = this.boundary_effects.loadAtticaRegionAction;
  loadAtticaRiversAction = this.river_effects.loadAtticaRiversAction;
  constructor(
    private boundary_effects: BoundaryEffects,
    private river_effects: RiverEffects
  ) {
    this.dispatch(this.loadAtticaRegionAction());
    this.dispatch(this.loadAtticaRiversAction());
  }
}
