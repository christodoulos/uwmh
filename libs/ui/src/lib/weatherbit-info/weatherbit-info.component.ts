import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, timer } from 'rxjs';
import { PNWeatherRepository } from '@uwmh/state';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'uwmh-weatherbit-info',
  templateUrl: './weatherbit-info.component.html',
  styleUrls: ['./weatherbit-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherbitInfoComponent implements OnInit {
  weatherData$ = this.pnWeather.weatherData$;
  constructor(private pnWeather: PNWeatherRepository) {}

  ngOnInit(): void {
    timer(0, 10 * 60 * 1000)
      .pipe(
        untilDestroyed(this),
        map(() => this.pnWeather.updateWeather())
      )
      .subscribe();
  }
}
