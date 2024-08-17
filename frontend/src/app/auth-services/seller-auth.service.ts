import { Injectable } from '@angular/core';
import { SellerUser, SellerAuth } from '../interfaces/seller.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerAuthService {
  constructor(private http: HttpClient) {}

  sellerIsLoggedIn = new BehaviorSubject<boolean>(false);
  sellerUser = new BehaviorSubject<SellerUser>({
    name: '',
    email: '',
  });

  sellerUserSignUp(sellerAuth: SellerAuth): Observable<HttpResponse<any>> {
    return this.http
      .post('http://localhost:3000/seller', sellerAuth, { observe: 'response' })
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error('Unable to Sign Up. Please try again later.')
          );
        })
      );
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.sellerIsLoggedIn.next(true);
      this.sellerUser.next(
        JSON.parse(localStorage.getItem('seller') as string)
      );
    }
  }
}
