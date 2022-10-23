import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnyPaint, LineLayout } from 'mapbox-gl';
import { v4 as uuidv4 } from 'uuid';
import * as geojson from 'geojson';
import { Observable } from 'rxjs';

@Component({
  selector: 'uwmh-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerComponent {
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
  @Input() data$ = new Observable<geojson.Feature>();
  @Input() layout: LineLayout = {
    'line-join': 'round',
    'line-cap': 'round',
  };
  @Input() paint: AnyPaint = {
    'line-color': '#000',
    'line-width': 2,
  };
}
