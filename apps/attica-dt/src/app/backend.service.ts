import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as geojson from 'geojson';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getAtticaRegion() {
    return this.http.get<geojson.Feature[]>('/api/location');
  }
}
