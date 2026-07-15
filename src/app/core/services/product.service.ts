import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '@app/core/models/product.model';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll(page = 0, size = 12): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  search(query: string, page = 0, size = 50): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?query=${encodeURIComponent(query)}&page=${page}&size=${size}`);
  }

  getByCategory(categoryId: string, page = 0, size = 50): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/category/${categoryId}?page=${page}&size=${size}`);
  }
}
