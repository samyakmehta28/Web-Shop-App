import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

export interface SellerAuth {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent {
  sellerAuth: SellerAuth = {
    name: '',
    email: '',
    password: '',
  };

  sellerSignUpFn(sellerSignUpForm: NgForm) {
    console.log(sellerSignUpForm.value);
    sellerSignUpForm.resetForm({
      name: '',
      email: '',
      password: '',
    });
  }
}
