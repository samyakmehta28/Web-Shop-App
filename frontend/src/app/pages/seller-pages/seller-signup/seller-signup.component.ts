import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SellerAuthService } from '../../../auth-services/seller-auth.service';
import { Router } from '@angular/router';
import { SellerSignup } from '../../../interfaces/seller.interface';
import { HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-seller-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './seller-signup.component.html',
  styleUrl: './seller-signup.component.css',
})
export class SellerSignupComponent implements OnInit {
  sellerSignup: SellerSignup = {
    name: '',
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

  sellerSignUpFn(sellerSignUpForm: NgForm) {
    this.sellerAuthService
      .sellerUserSignUp(this.sellerSignup)
      .pipe(
        finalize(() => {
          // This will always be executed after the observable completes
          sellerSignUpForm.resetForm({
            name: '',
            email: '',
            password: '',
          });
        })
      )
      .subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status === 201) {
            this.sellerAuthService.sellerIsLoggedIn.next(true);
            this.sellerAuthService.sellerUser.next({
              name: this.sellerSignup.name,
              email: this.sellerSignup.email,
            });
            localStorage.setItem(
              'seller',
              JSON.stringify({
                name: this.sellerSignup.name,
                email: this.sellerSignup.email,
              })
            );
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
