import { Injectable } from '@angular/core';
import {
  SellerUser,
  SellerSignup,
  SellerLogin,
} from '../interfaces/seller.interface';
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

  sellerUserSignUp(sellerSignup: SellerSignup): Observable<HttpResponse<any>> {
    return this.http
      .post('http://localhost:3000/seller', sellerSignup, {
        observe: 'response',
      })
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error('Unable to Sign Up. Please try again later.')
          );
        })
      );
  }

  sellerUserLogin(sellerLogin: SellerLogin): Observable<HttpResponse<any>> {
    return this.http
      .get(`http://localhost:3000/seller?email=${sellerLogin.email}`, {
        observe: 'response',
      })
      .pipe(
        catchError((error) => {
          return throwError(
            () => new Error('Unable to Login. Please try again later.')
          );
        })
      );
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      // console.log(localStorage.getItem('seller'));
      this.sellerIsLoggedIn.next(true);
      this.sellerUser.next(
        JSON.parse(localStorage.getItem('seller') as string)
      );
    }
  }
}
