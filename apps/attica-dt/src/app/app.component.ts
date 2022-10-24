import { Component } from '@angular/core';
import { BoundaryEffects, RiverEffects } from '@uwmh/state';
import { dispatch } from '@ngneat/effects';

@Component({
  selector: 'uwmh-root',
  template: '<uwmh-layout></uwmh-layout>',
})
export class AppComponent {
  loadAtticaRegionAction = this.boundary_effects.loadAtticaRegionAction;
  loadAtticaRiversAction = this.river_effects.loadAtticaRiversAction;
  dispatch = dispatch;
  constructor(
    private boundary_effects: BoundaryEffects,
    private river_effects: RiverEffects
  ) {
    this.dispatch(this.loadAtticaRegionAction());
    this.dispatch(this.loadAtticaRiversAction());
  }
}
