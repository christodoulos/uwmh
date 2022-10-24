import { Component } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'uwmh-plant-nursery',
  templateUrl: './plant-nursery.component.html',
  styleUrls: ['./plant-nursery.component.css'],
})
export class PlantNurseryComponent {
  map: Map | undefined;

  onMap(map: Map) {
    this.map = map;
    this.map.setCenter([23.781372557061157, 37.988260208268386]);
    this.map.setZoom(16);

    const marker = new Marker();
    marker.setLngLat([23.781372557061157, 37.988260208268386]);
    marker.addTo(this.map);
  }
}
