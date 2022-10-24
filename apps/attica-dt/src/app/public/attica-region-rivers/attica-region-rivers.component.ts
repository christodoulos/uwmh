import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BoundaryEffects,
  BoundaryRepository,
  RiverEffects,
  RiverRepository,
} from '@uwmh/state';
import { dispatch } from '@ngneat/effects';
import { Map } from 'mapbox-gl';
import { Subscription } from 'rxjs';

@Component({
  selector: 'uwmh-attica-region-rivers',
  templateUrl: './attica-region-rivers.component.html',
  styleUrls: ['./attica-region-rivers.component.css'],
})
export class AtticaRegionRiversComponent implements OnInit, OnDestroy {
  loadAtticaRegionAction = this.effects.loadAtticaRegionAction;
  loadAtticaRiversAction = this.r_effects.loadAtticaRiversAction;
  attica$ = this.repo.attica_region$;
  rivers$ = this.r_repo.attica_rivers$;
  dispatch = dispatch;
  constructor(
    private repo: BoundaryRepository,
    private effects: BoundaryEffects,
    private r_repo: RiverRepository,
    private r_effects: RiverEffects
  ) {}
  map: Map | undefined;
  subscription: Subscription | undefined;
  river_subscription: Subscription | undefined;

  ngOnInit(): void {
    this.dispatch(this.loadAtticaRegionAction());
    this.dispatch(this.loadAtticaRiversAction());
  }

  onMap(map: Map) {
    this.map = map;

    this.subscription = this.attica$.subscribe((data) => {
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

    this.river_subscription = this.rivers$.subscribe((data) => {
      console.log('RIVER DATA >', data);
      this.map?.addSource('attica-rivers', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: data.features },
      });
      this.map?.addLayer({
        id: 'attica-region-rivers',
        type: 'line',
        source: 'attica-rivers',
        paint: {
          'line-color': '#00F',
          'line-width': 1,
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
