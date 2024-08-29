import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class SellerUpdateProductService {
  constructor(private http: HttpClient) {}

  getSingleProduct(id: string): Observable<HttpResponse<any>> {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`, {
      observe: 'response',
    });
  }

  updateSingleProduct(
    id: string,
    product: Product
  ): Observable<HttpResponse<any>> {
    return this.http.put(`http://localhost:3000/products/${id}`, product, {
      observe: 'response',
    });
  }
}
