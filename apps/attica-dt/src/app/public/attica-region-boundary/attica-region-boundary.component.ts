import { Component, OnDestroy } from '@angular/core';
import { BoundaryEffects, BoundaryRepository } from '@uwmh/state';
import { dispatch } from '@ngneat/effects';
import { Subscription } from 'rxjs';
import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './attica-region-boundary.component.html',
  styleUrls: ['./attica-region-boundary.component.css'],
})
export class AtticaRegionBoundaryComponent implements OnDestroy {
  attica_region$ = this.repository.attica_region$;
  load_attica_region = this.effects.loadAtticaRegionAction;
  dispatch = dispatch;
  features$ = Array(this.attica_region$);
  constructor(
    private repository: BoundaryRepository,
    private effects: BoundaryEffects
  ) {}
  map: Map | undefined;
  subscription: Subscription | undefined;

  onMap(map: Map) {
    this.map = map;
    this.subscription = this.attica_region$.subscribe((data) => {
      this.map?.addSource('attica-boundary', { type: 'geojson', data: data });
      this.map?.addLayer({
        id: 'attica-region-fill',
        type: 'fill',
        source: 'attica-boundary',
        paint: {
          'fill-color': '#F00',
          'fill-opacity': 0.4,
        },
      });
      this.map?.addLayer({
        id: 'attica-region-boundary',
        type: 'line',
        source: 'attica-boundary',
        paint: {
          'line-color': '#000',
          'line-width': 1,
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
