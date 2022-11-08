import { Injectable } from '@angular/core';
import { LayersRepository } from './state';

import { DTMapService } from './map.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  map = this.mapService.mapSubject;
  constructor(
    private mapService: DTMapService,
    private layers: LayersRepository
  ) {}

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
    this.layers.hide_layer('attica-region-boundary-line');
    this.layers.hide_layer('attica-region-boundary-fill');
    this.map.value.flyTo({
      center: [23.781372557061157, 37.988260208268386],
      zoom: 17,
      bearing: 45,
      pitch: 75,
      duration: 3000,
      essential: true,
    });
  }
}
