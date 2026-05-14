import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInput, RegisterInput } from '../models/auth.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(user: RegisterInput): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: LoginInput): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, credentials);
  }

  signout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  setToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}
