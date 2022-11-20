import { Injectable } from '@angular/core';
import { createStore, withProps, select } from '@ngneat/elf';
import { PNWeather, PNWeatherInit } from '@uwmh/data';
import { lastValueFrom, map, tap } from 'rxjs';
import { BackendService } from '../backend.service';

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

  async updateWeather() {
    return await lastValueFrom(
      this.backend.getPNWeather().pipe(
        tap((data) => {
          const updated_on = new Date();
          pnweather.update((state) => ({
            ...state,
            ...data,
            updated_on: updated_on,
          }));
        })
      )
    );
  }
}
