import { Injectable } from '@angular/core';
import { Map } from 'mapbox-gl';
import { AtticaStore } from './state';
import { sources } from '@uwmh/data';
import { zip, concat, merge } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DTMapService {
  constructor() {
    // console.log('MAP SERVICE');
    // this.atticaBoundary$.subscribe((data) => {
    //   this.sources['attica-boundary'] = {
    //     id: 'attica-boundary',
    //     source: { type: 'geojson', data },
    //   };
    //   console.log(this.sources);
    // });
    // this.atticaRivers$.subscribe((data) => {
    //   this.sources['attica-rivers'] = {
    //     id: 'attica-rivers',
    //     source: { type: 'geojson', data },
    //   };
    //   console.log(this.sources);
    // });
  }

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
