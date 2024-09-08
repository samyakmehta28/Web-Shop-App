import { Injectable, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  getSearchProducts(searchQuery: string): Observable<HttpResponse<any>> {
    return this.http.get<Product[]>(`http://localhost:3000/products`, {
      observe: 'response',
    });
  }
}
