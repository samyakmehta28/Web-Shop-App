import { SellerAuthService } from '../../../auth-services/seller-auth.service';
import { Component } from '@angular/core';
import { SellerLogin } from '../../../interfaces/seller.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-seller-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './seller-login.component.html',
  styleUrl: './seller-login.component.css',
})
export class SellerLoginComponent {
  sellerLogin: SellerLogin = {
    email: '',
    password: '',
  };

  isLoading: boolean = false;

  constructor(
    private sellerAuthService: SellerAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.sellerAuthService.reloadSeller();
    this.sellerAuthService.sellerIsLoggedIn.subscribe({
      next: (value) => {
        if (value) {
          this.router.navigate(['/seller', 'home']);
        }
      },
    });
    this.isLoading = false;
  }

  sellerLoginFn(sellerLoginForm: NgForm) {
    this.sellerAuthService
      .sellerUserLogin(this.sellerLogin)
      .pipe(
        finalize(() => {
          // This will always be executed after the observable completes
          sellerLoginForm.resetForm({
            email: '',
            password: '',
          });
        })
      )
      .subscribe({
        next: (response: HttpResponse<any>) => {
          if (
            response.status === 200 &&
            response.body?.[0]?.password &&
            response.body?.[0]?.password === this.sellerLogin.password
          ) {
            const data = {
              name: response.body?.[0]?.name,
              email: response.body?.[0]?.email,
            };
            this.sellerAuthService.sellerIsLoggedIn.next(true);
            this.sellerAuthService.sellerUser.next(data);
            localStorage.setItem('seller', JSON.stringify(data));
            this.router.navigate(['/seller', 'home']);
          } else {
            alert('Something went wrong. Please try again');
          }
        },
        error: (error) => {
          alert('Unable to connect to backend. Please try again later.');
        },
      });
  }
}
