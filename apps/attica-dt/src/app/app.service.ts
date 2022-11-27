import { Injectable } from '@angular/core';
import { LayersRepository, PNWeatherRepository } from './state';

import { DTMapService } from './map.service';
import { PNPLCEntities } from './state/pnplc';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  map = this.mapService.mapSubject;
  pnNeedsUpdate$ = this.pnrepo.needsUpdate$;
  constructor(
    private mapService: DTMapService,
    private layers: LayersRepository,
    private pnrepo: PNWeatherRepository,
    private pnplc: PNPLCEntities
  ) {
    // this.pnNeedsUpdate$.subscribe((needsUpdate) => {
    //   if (needsUpdate) {
    //     this.pnrepo.updateWeather();
    //   }
    // });
    // setTimeout(() => {
    //   this.scheduled_tasks();
    // }, 60 * 1000);
  }

  scheduled_tasks() {
    this.pnrepo.updateWeather();
  }

  boundary_zoom() {
    this.layers.show_layer('attica-region-boundary-line');
    this.layers.show_layer('attica-region-boundary-fill');
    const s = this.layers.attica_boundary_line$.subscribe((layer) => {
      this.map.value.fitBounds(layer.bbox as mapboxgl.LngLatBoundsLike, {
        zoom: 7,
        bearing: 0,
        pitch: 0,
        linear: false,
      });
    });
    s.unsubscribe();
  }

  rivers() {
    this.layers.hide_layer('attica-region-boundary-line');
    this.layers.hide_layer('attica-region-boundary-fill');
    this.layers.show_layer('attica-perfecture-rivers');
    const s = this.layers.attica_rivers$.subscribe((layer) => {
      this.map.value.fitBounds(layer.bbox as mapboxgl.LngLatBoundsLike, {
        zoom: 9,
        bearing: 0,
        pitch: 0,
        linear: false,
      });
    });
    s.unsubscribe();
  }

  nursery() {
    // this.pnrepo.updateWeather();
    this.layers.hide_layer('attica-region-boundary-line');
    this.layers.hide_layer('attica-region-boundary-fill');
    this.layers.hide_layer('attica-perfecture-rivers');
    this.map.value.flyTo({
      center: [23.781372557061157, 37.988260208268386],
      zoom: 17,
      bearing: 45,
      pitch: 75,
      duration: 5000,
      essential: true,
    });
  }

  portara() {
    this.map.value.flyTo({
      center: [25.37260003010752, 37.11014654505334],
      zoom: 18,
      bearing: 90,
      pitch: 90,
      duration: 5000,
      essential: true,
    });
  }
}
