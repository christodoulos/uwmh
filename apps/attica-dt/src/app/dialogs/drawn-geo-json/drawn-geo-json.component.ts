import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DrawnFeaturesRepository } from '../../state/draw';

@Component({
  selector: 'uwmh-drawn-geo-json',
  templateUrl: './drawn-geo-json.component.html',
  styleUrls: ['./drawn-geo-json.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawnGeoJsonComponent implements OnInit {
  features$ = this.drawn.features$;
  constructor(private drawn: DrawnFeaturesRepository) {}

  ngOnInit(): void {}
}
