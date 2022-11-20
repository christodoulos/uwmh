import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AtticaIndex, Boundary, PNWeather, River } from '@uwmh/data';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getAtticaIndex() {
    // console.log('getAtticaIndex');
    return this.http.get<AtticaIndex>('/api/attica');
  }

  getBoundary(id: string) {
    return this.http.get<Boundary>(`/api/boundary/${id}`);
  }

  getRivers(ids: string[]) {
    // console.log('getRivers', ids);
    return this.http.post<River[]>('/api/river/', ids);
  }

  getPNWeather() {
    return this.http.get<PNWeather>('/api/nursery/latest');
  }
}
