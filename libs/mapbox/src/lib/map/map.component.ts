import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
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
  // map related inputs
  @Input() style = 'mapbox://styles/mapbox/streets-v11';
  @Input() bounds: LngLatBoundsLike = [
    [24.116494, 38.340999],
    [22.890434, 35.823757],
  ];
  @Input() center: LngLatLike = [23.600814, 37.840158];
  @Input() navigationControl = true;
  @Input() fullscreenControl = true;
  @Input() scaleControl = true;
  // layer related inputs
  // @Input() features: geojson.Feature[] = [];
  // @Input() feature: geojson.Feature | null = InitBoundary;
  @Input() features$ = Array(new Observable<geojson.Feature>());
  @Output() map = new EventEmitter<Map>();
  // map!: Map;

  onMapLoad(map: Map) {
    this.map.emit(map);
  }
}
