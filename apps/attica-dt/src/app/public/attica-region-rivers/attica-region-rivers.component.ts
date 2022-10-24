import { Component, OnDestroy } from '@angular/core';
import { RiverEffects, RiverRepository } from '@uwmh/state';
import { dispatch } from '@ngneat/effects';
import { Map } from 'mapbox-gl';
import { Subscription } from 'rxjs';

@Component({
  selector: 'uwmh-attica-region-rivers',
  templateUrl: './attica-region-rivers.component.html',
  styleUrls: ['./attica-region-rivers.component.css'],
})
export class AtticaRegionRiversComponent implements OnDestroy {
  loadAtticaRiversAction = this.effects.loadAtticaRiversAction;
  rivers$ = this.repository.attica_rivers$;
  dispatch = dispatch;
  constructor(
    private repository: RiverRepository,
    private effects: RiverEffects
  ) {}
  map: Map | undefined;
  subscription: Subscription | undefined;

  onMap(map: Map) {
    this.map = map;

    this.map.setCenter([23.743390455487827, 38.11284502461751]);
    this.map.setZoom(9);

    this.subscription = this.rivers$.subscribe((data) => {
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
