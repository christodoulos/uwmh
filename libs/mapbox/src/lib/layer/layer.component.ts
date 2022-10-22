import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AnyPaint, AnySourceData, LineLayout } from 'mapbox-gl';
import { v4 as uuidv4 } from 'uuid';
import * as geojson from 'geojson';

@Component({
  selector: 'uwmh-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerComponent implements OnInit {
  @Input() id = uuidv4();
  @Input() type:
    | 'symbol'
    | 'background'
    | 'circle'
    | 'fill-extrusion'
    | 'fill'
    | 'heatmap'
    | 'hillshade'
    | 'line'
    | 'raster'
    | 'custom'
    | 'sky' = 'line';
  @Input() sourceType = 'geojson';
  @Input() data: geojson.Feature = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [0, 0],
    },
    properties: {},
  };
  @Input() layout: LineLayout = {
    'line-join': 'round',
    'line-cap': 'round',
  };
  @Input() paint: AnyPaint = {
    'line-color': '#000',
    'line-width': 2,
  };
  source = {
    type: this.sourceType,
    data: this.data,
  } as AnySourceData;

  ngOnInit() {
    console.log('BBBBBBBBBBBBBBBBBBBBBB', this.data);
  }
}
