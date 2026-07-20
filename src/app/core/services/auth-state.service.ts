import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  constructor(private authService: AuthService) {}

  private hasToken(): boolean {
    return !!this.authService.getToken();
  }

  checkAuth(): void {
    this.loggedInSubject.next(this.hasToken());
  }

  logout(): void {
    this.authService.setToken('');
    localStorage.removeItem('jwtToken');
    this.loggedInSubject.next(false);
  }
}
