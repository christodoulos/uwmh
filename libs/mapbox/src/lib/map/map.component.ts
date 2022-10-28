import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { LngLatBoundsLike, LngLatLike, Map } from 'mapbox-gl';
import * as geojson from 'geojson';
import { Observable } from 'rxjs';

@Component({
  selector: 'uwmh-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  @Input() style = 'mapbox://styles/mapbox/streets-v11';
  @Input() bounds: LngLatBoundsLike = [
    [24.116494, 38.340999],
    [22.890434, 35.823757],
  ];
  @Input() center: LngLatLike = [23.600814, 37.840158];
  @Input() navigationControl = true;
  @Input() fullscreenControl = true;
  @Input() scaleControl = true;
  @Output() map = new EventEmitter<Map>();
  @Output() flyto = new EventEmitter();
  themap: Map | undefined;

  onMapLoad(map: Map) {
    this.themap = map;
    this.map.emit(map);
  }

  click0() {
    console.log('skata');
    this.flyto.emit();
    // this.themap?.flyTo({ center: [55, 33] });
  }
}
