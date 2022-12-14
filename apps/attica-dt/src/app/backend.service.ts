import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AtticaIndex, Boundary, River, UserDTO } from '@uwmh/data';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient, private router: Router) {}

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
}
