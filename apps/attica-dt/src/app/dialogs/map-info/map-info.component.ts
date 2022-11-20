import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PNWeatherRepository } from '../../state';

@Component({
  selector: 'uwmh-map-info',
  templateUrl: './map-info.component.html',
  styleUrls: ['./map-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapInfoComponent implements OnInit {
  weatherData$ = this.pnWeather.weatherData$;
  constructor(private pnWeather: PNWeatherRepository) {}

  ngOnInit(): void {}
}
