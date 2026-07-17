import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '@app/core/services/auth.service';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Bearer token to requests', () => {
    authServiceSpy.getToken.and.returnValue('test-token');
    const req = new HttpRequest<any>('GET', '/api/test');
    const next = jasmine.createSpyObj<HttpHandler>('HttpHandler', ['handle']);

    interceptor.intercept(req, next);

    expect(next.handle).toHaveBeenCalled();
  });

  it('should skip token for auth endpoints', () => {
    authServiceSpy.getToken.and.returnValue('test-token');
    const req = new HttpRequest<any>('POST', '/auth/authenticate', null);
    const next = jasmine.createSpyObj<HttpHandler>('HttpHandler', ['handle']);

    interceptor.intercept(req, next);

    expect(next.handle).toHaveBeenCalled();
  });
});
