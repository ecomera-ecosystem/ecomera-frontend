import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Cart, AddToCartRequest } from '@app/core/models/cart.model';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;

  private cartSubject = new BehaviorSubject<Cart | null>(null);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {}

  get currentCart(): Cart | null {
    return this.cartSubject.value;
  }

  refreshCart(): void {
    this.http.get<Cart>(this.apiUrl).subscribe({
      next: (cart) => this.cartSubject.next(cart),
      error: () => this.cartSubject.next(null),
    });
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl);
  }

  addItem(request: AddToCartRequest): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/items`, request).pipe(
      tap((cart) => this.cartSubject.next(cart)),
    );
  }

  updateQuantity(itemId: string, quantity: number): Observable<Cart> {
    return this.http.patch<Cart>(`${this.apiUrl}/items/${itemId}`, { quantity }).pipe(
      tap((cart) => this.cartSubject.next(cart)),
    );
  }

  removeItem(itemId: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/items/${itemId}`).pipe(
      tap((cart) => this.cartSubject.next(cart)),
    );
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.apiUrl).pipe(
      tap(() => this.cartSubject.next({ id: '', userId: '', items: [], totalPrice: 0, totalItems: 0 })),
    );
  }
}
