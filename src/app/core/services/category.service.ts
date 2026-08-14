import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '@app/core/models/category.model';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAllActive(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
