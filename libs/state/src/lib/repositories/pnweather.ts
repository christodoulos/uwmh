import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';
import { PNWeather, PNWeatherInit } from '../interfaces';
import { map } from 'rxjs';
import { BackendService } from './backend.service';

const pnweather = createStore(
  { name: 'pnweather' },
  withProps<PNWeather>(PNWeatherInit)
);

@Injectable()
export class PNWeatherRepository {
  // updates every hour
  needsUpdate$ = pnweather.pipe(
    select((state) => state.updated_on),
    map((ts) => new Date().getTime() - ts.getTime() > 1)
  );
  weatherData$ = pnweather.pipe(select((state) => state));

  constructor(private backend: BackendService) {}

  updateWeather() {
    const s = this.backend.getPNWeather().subscribe((data) => {
      const updated_on = new Date();
      pnweather.update((state) => ({
        ...state,
        ...data,
        updated_on: updated_on,
      }));
      s.unsubscribe();
    });

    // const s = this.backend
    //   .getPNWeather()
    //   .pipe(
    //     tap((data) => {
    //       const updated_on = new Date();
    //       pnweather.update((state) => ({
    //         ...state,
    //         ...data,
    //         updated_on: updated_on,
    //       }));
    //       s.unsubscribe();
    //     })
    //   )
    //   .subscribe();
  }
}
