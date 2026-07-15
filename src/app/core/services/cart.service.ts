import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart, AddToCartRequest } from '@app/core/models/cart.model';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = `${environment.apiUrl}/carts`;

  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/my`);
  }

  addItem(request: AddToCartRequest): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/items`, request);
  }

  updateQuantity(itemId: string, quantity: number): Observable<Cart> {
    return this.http.patch<Cart>(`${this.apiUrl}/items/${itemId}`, { quantity });
  }

  removeItem(itemId: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/items/${itemId}`);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/my`);
  }
}
