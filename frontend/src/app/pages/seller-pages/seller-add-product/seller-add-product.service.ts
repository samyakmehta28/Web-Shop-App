import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Product } from '../../../interfaces/product.interface';
import { catchError, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerAddProductService {
  constructor(private http: HttpClient) {}

  addProduct(product: Product): Observable<HttpResponse<any>> {
    return this.http
      .post('http://localhost:3000/products', product, {
        observe: 'response',
      })
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error('Unable to Add Product. Please try again later.')
          );
        })
      );
  }
}
