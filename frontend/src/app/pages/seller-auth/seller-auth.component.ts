import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { SellerAuthService } from '../../auth-services/seller-auth.service';
import { Router } from '@angular/router';
import { SellerAuth } from '../../interfaces/seller.interface';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent implements OnInit {
  sellerAuth: SellerAuth = {
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
          this.router.navigate(['/seller-home']);
        }
      },
    });
    this.isLoading = false;
  }

  sellerSignUpFn(sellerSignUpForm: NgForm) {
    this.sellerAuthService.sellerUserSignUp(this.sellerAuth).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 201) {
          this.sellerAuthService.sellerIsLoggedIn.next(true);
          this.sellerAuthService.sellerUser.next({
            name: this.sellerAuth.name,
            email: this.sellerAuth.email,
          });
          localStorage.setItem(
            'seller',
            JSON.stringify(this.sellerAuthService.sellerUser)
          );
          this.router.navigate(['/seller-home']);
        } else {
          alert('Something went wrong. Please try again');
        }
      },
      error: (error) => {
        alert('Unable to connect to backend. Please try again later.');
      },
    });

    sellerSignUpForm.resetForm({
      name: '',
      email: '',
      password: '',
    });
  }
}
