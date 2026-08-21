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

  filter(options: {
    q?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    color?: string;
    size?: string;
    sort?: string;
    page?: number;
    pageSize?: number;
  }): Observable<any> {
    const params = new URLSearchParams();
    if (options.q) params.set('q', options.q);
    if (options.categoryId) params.set('categoryId', options.categoryId);
    if (options.minPrice != null) params.set('minPrice', String(options.minPrice));
    if (options.maxPrice != null) params.set('maxPrice', String(options.maxPrice));
    if (options.color) params.set('color', options.color);
    if (options.size) params.set('size', options.size);

    params.set('sort', options.sort || 'newest');
    params.set('page', String(options.page ?? 0));
    params.set('pageSize', String(options.pageSize ?? 12));


    return this.http.get<any>(`${this.apiUrl}/filter?${params.toString()}`);
  }
}
