import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AtticaIndex,
  Boundary,
  River,
  UserDTO,
  PNWeather,
  PNPLC,
  EYDAP_APN,
} from '../interfaces';
import { Observable } from 'rxjs';

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

  // Users

  getUserByEmail(email: string): Observable<UserDTO | null> {
    return this.http.post<UserDTO | null>('/api/auth/user', { email });
  }

  signUpUser(token: string, user: UserDTO): Observable<{ jwt: string }> {
    return this.http.post<{ jwt: string }>('/api/auth/user/signup', {
      token,
      user,
    });
  }

  signInUser(token: string): Observable<{ jwt: string }> {
    return this.http.post<{ jwt: string }>('/api/auth/user/signin', { token });
  }

  // Athens Plant Nursery

  getPNWeather() {
    return this.http.get<PNWeather>('/api/nursery/latest');
  }

  getPNPLCEntities() {
    return this.http.get<PNPLC[]>('/api/nursery/plc');
  }

  writeEYDAPAnalysis(analysis: EYDAP_APN) {
    return this.http.post<EYDAP_APN>('/api/nursery/eydap', analysis);
  }
}
