import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DrawnFeaturesRepository } from '@uwmh/state';

@Component({
  selector: 'uwmh-drawn-geo-json',
  templateUrl: './drawn-geo-json.component.html',
  styleUrls: ['./drawn-geo-json.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawnGeoJsonComponent {
  features$ = this.drawn.features$;
  constructor(private drawn: DrawnFeaturesRepository) {}
}
