import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getTopProducts(): Observable<HttpResponse<any>> {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=5', {
      observe: 'response',
    });
  }
}
