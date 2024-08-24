import { SellerAddProductService } from './seller-add-product.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../interfaces/product.interface';
import { finalize, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent {
  product: Product = {
    name: '',
    price: 0,
    category: '',
    color: '',
    description: '',
    image: '',
  };

  constructor(private sellerAddProductService: SellerAddProductService) {}

  addProductFn(addProductForm: NgForm) {
    console.log(this.product);
    this.sellerAddProductService
      .addProduct(this.product)
      .pipe(
        finalize(() => {
          addProductForm.resetForm({
            name: '',
            price: 0,
            category: '',
            color: '',
            description: '',
            image: '',
          });
        })
      )
      .subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status === 201) {
            alert('Product Added Successfully');
          } else {
            alert('Something went wrong. Please try again later.');
          }
        },
        error: (error) => {
          alert(error);
        },
      });
  }
}
