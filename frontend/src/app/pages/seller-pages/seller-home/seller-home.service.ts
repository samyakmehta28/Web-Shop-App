import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class SellerHomeService {
  constructor(private http: HttpClient) {}

  getSellerProducts(): Observable<HttpResponse<any>> {
    return this.http
      .get<Product[]>('http://localhost:3000/products', {
        observe: 'response',
      })
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error('Unable to get products. Please try again later.')
          );
        })
      );
  }

  deleteProduct(id: string): Observable<HttpResponse<any>> {
    return this.http
      .delete(`http://localhost:3000/products/${id}`, {
        observe: 'response',
      })
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error('Unable to delete product. Please try again later.')
          );
        })
      );
  }
}
