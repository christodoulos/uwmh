import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LngLatBoundsLike, LngLatLike, Map } from 'mapbox-gl';

@Component({
  selector: 'uwmh-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  @Input() style = 'mapbox://styles/christodoulos/ckzichi5q001l15p1wpq6sbvs';
  @Input() bounds: LngLatBoundsLike = [
    [24.116494, 38.340999],
    [22.890434, 35.823757],
  ];
  @Input() center: LngLatLike = [23.600814, 37.840158];
  @Input() pitch = [45] as [number];
  @Input() navigationControl = true;
  @Input() fullscreenControl = true;
  @Input() scaleControl = true;
  @Output() map = new EventEmitter<Map>();
  @Output() flyto = new EventEmitter();
  themap: Map | undefined;
  mapStyle = 'streets';

  onMapLoad(map: Map) {
    this.map.emit(map);
    this.themap = map;
  }

  getLayers() {
    console.log(this.themap?.getStyle().layers);
  }

  streets() {
    this.themap?.setStyle('mapbox://styles/mapbox/streets-v11');
  }

  satelite() {
    this.themap?.setStyle('mapbox://styles/mapbox/satellite-streets-v11');
  }

  outdoors() {
    this.themap?.setStyle('mapbox://styles/mapbox/outdoors-v11');
  }
}
