import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInput, RegisterInput, User } from '../models/auth.model';
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
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  signout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  getMe(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  setToken(token: string) {
    if (!token) {
      localStorage.removeItem('jwtToken');
      return;
    }
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}
