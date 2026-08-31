import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '@app/core/models/order.model';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  checkout(): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/checkout`, {});
  }

  getMyOrders(userId: string, page = 0, size = 10): Observable<{ content: Order[]; totalElements: number }> {
    return this.http.get<{ content: Order[]; totalElements: number }>(`${this.apiUrl}/user/${userId}`, {
      params: { page: String(page), size: String(size) },
    });
  }

  getAll(page = 0, size = 10): Observable<{ content: Order[]; totalElements: number }> {
    return this.http.get<{ content: Order[]; totalElements: number }>(this.apiUrl, {
      params: { page: String(page), size: String(size) },
    });
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }
}
