import { Injectable } from '@angular/core';
import { Map } from 'mapbox-gl';
import { Subscription } from 'rxjs';
// import { BoundaryStore, RiverStore } from './state';

@Injectable({
  providedIn: 'root',
})
export class DTMapService {
  map: Map | undefined;

  // atticaBoundary$ = this.boundaryStore$.attica_region$;
  // atticaRivers$ = this.riverStore$.attica_rivers$;

  // constructor() // private boundaryStore$: BoundaryStore,
  // // private riverStore$: RiverStore
  // {}

  // attica_boundaries(): Subscription {
  //   const subscription: Subscription = this.atticaBoundary$.subscribe(
  //     (data) => {
  //       this.map?.addSource('attica-boundary', { type: 'geojson', data: data });
  //       this.map?.addLayer({
  //         id: 'attica-region-fill',
  //         type: 'fill',
  //         source: 'attica-boundary',
  //         paint: {
  //           'fill-color': '#F00',
  //           'fill-opacity': 0.4,
  //         },
  //       });
  //       this.map?.addLayer({
  //         id: 'attica-region-boundary',
  //         type: 'line',
  //         source: 'attica-boundary',
  //         paint: {
  //           'line-color': '#000',
  //           'line-width': 1,
  //         },
  //       });
  //     }
  //   );
  //   return subscription;
  // }

  // attica_rivers(): Subscription {
  //   this.map?.setCenter([23.743390455487827, 38.11284502461751]);
  //   this.map?.setZoom(9);
  //   const subscription = this.atticaRivers$.subscribe((data) => {
  //     this.map?.addSource('attica-rivers', {
  //       type: 'geojson',
  //       data: { type: 'FeatureCollection', features: data.features },
  //     });
  //     this.map?.addLayer({
  //       id: 'attica-region-rivers',
  //       type: 'line',
  //       source: 'attica-rivers',
  //       paint: {
  //         'line-color': '#00F',
  //         'line-width': 1,
  //       },
  //     });
  //   });
  //   return subscription;
  // }
}
