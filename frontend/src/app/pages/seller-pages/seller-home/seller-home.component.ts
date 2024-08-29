import { Component, OnInit } from '@angular/core';
import { SellerHomeService } from './seller-home.service';
import { HttpResponse } from '@angular/common/http';
import { Product } from '../../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent implements OnInit {
  productList: Product[] | undefined = [];
  constructor(
    private sellerHomeService: SellerHomeService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.listSellerProducts();
  }

  listSellerProducts() {
    this.sellerHomeService.getSellerProducts().subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.productList = response.body;
        }
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  removeProduct(id: string | undefined) {
    if (!id) {
      alert('Product not found');
      return;
    }
    this.sellerHomeService.deleteProduct(id).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          alert('Product Deleted Successfully');
          this.listSellerProducts();
        } else {
          alert('Something went wrong. Please try again later.');
        }
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  editProduct(id: string | undefined) {
    if (!id) {
      alert('Product not found');
      return;
    }
    this.route.navigate(['seller/update-product', id]);
  }
}
