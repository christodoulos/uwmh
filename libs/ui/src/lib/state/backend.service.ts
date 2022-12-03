import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PNWeather, PNPLC } from '@uwmh/data';

@Injectable({
  providedIn: 'root',
})
export class UiBackendService {
  constructor(private http: HttpClient) {}

  getPNWeather() {
    return this.http.get<PNWeather>('/api/nursery/latest');
  }

  getPNPLCEntities() {
    return this.http.get<PNPLC[]>('/api/nursery/plc');
  }
}
