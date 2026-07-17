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
    const req = new HttpRequest('GET', '/api/test');
    const next = jasmine.createSpyObj<HttpHandler>('HttpHandler', ['handle']);

    interceptor.intercept(req, next);

    expect(next.handle).toHaveBeenCalledWith(
      jasmine.objectContaining({
        headers: jasmine.objectContaining({
          Authorization: 'Bearer test-token',
        }),
      }),
    );
  });

  it('should skip token for auth endpoints', () => {
    authServiceSpy.getToken.and.returnValue('test-token');
    const req = new HttpRequest('POST', '/auth/authenticate');
    const next = jasmine.createSpyObj<HttpHandler>('HttpHandler', ['handle']);

    interceptor.intercept(req, next);

    expect(next.handle).toHaveBeenCalledWith(
      jasmine.objectContaining({ url: '/auth/authenticate' }),
    );
  });
});
