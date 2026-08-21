import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private authService = inject(AuthService);

  private loggedInSubject = new BehaviorSubject<boolean>(this.isValidToken());
  isLoggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  private isValidToken(): boolean {
    const token = this.authService.getToken();
    if (!token) return false;
    try {
      const parts = token.split('.');
      return parts.length === 3 && parts.every(p => p.length > 0);
    } catch {
      return false;
    }
  }

  checkAuth(): void {
    this.loggedInSubject.next(this.isValidToken());
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.loggedInSubject.next(false);
  }
}
