import { Injectable, inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@app/core/services/auth.service';
import { AuthStateService } from '@app/core/services/auth-state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private authState = inject(AuthStateService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
      return next.handle(req);
    }

    const token = this.authService.getToken();
    if (!token) return next.handle(req);

    if (this.isTokenExpired(token)) {
      this.authState.logout();
      return next.handle(req);
    }

    return next.handle(
      req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }),
    );
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const nowSec = Math.floor(Date.now() / 1000);
      return payload.exp != null && payload.exp < nowSec;
    } catch {
      return true;
    }
  }
}
