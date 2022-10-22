import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { LngLatBoundsLike, LngLatLike } from 'mapbox-gl';
import * as geojson from 'geojson';

@Component({
  selector: 'uwmh-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
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
  @Input() features: geojson.Feature[] = [];

  ngOnInit() {
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLLL', this.features);
  }
}
