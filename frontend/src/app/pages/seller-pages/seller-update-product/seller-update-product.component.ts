import { FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../interfaces/product.interface';
import { SellerUpdateProductService } from './seller-update-product.service';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent implements OnInit {
  product: Product = {
    name: '',
    price: 0,
    category: '',
    color: '',
    description: '',
    image: '',
  };

  constructor(
    private route: ActivatedRoute,
    private sellerUpdateProductComponent: SellerUpdateProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let productId: string = this.route.snapshot.params['id'];
    this.sellerUpdateProductComponent.getSingleProduct(productId).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.product = response.body;
        }
      },
      error: (error) => {
        alert(error.message);
      },
    });
  }

  updateProductFn(updateProductForm: NgForm) {
    if (!this.product.id) {
      alert('Product not found');
      return;
    }
    this.sellerUpdateProductComponent
      .updateSingleProduct(this.product.id, this.product)
      .subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status === 200) {
            alert('Product Updated Successfully');
            this.router.navigate(['/seller/home']);
          } else {
            alert(response.body);
          }
        },
        error: (error) => {
          alert(error.message);
        },
      });
  }
}
