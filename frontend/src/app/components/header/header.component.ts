import { HeaderService } from './header.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { SellerAuthService } from '../../auth-services/seller-auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Product } from '../../interfaces/product.interface';
import { Observable } from 'rxjs';
import { HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  headerType: string = 'default';
  sellerName: string = '';
  searchQuery: string = '';
  filteredProducts: Product[] = [];
  showSearch: boolean = false;
  constructor(
    private router: Router,
    private sellerAuthService: SellerAuthService,
    private headerService: HeaderService,
    private elRef: ElementRef
  ) {}

  //pipe operator takes in observables and transforms it into a different observable
  ngOnInit(): void {
    this.router.events.subscribe((value: any) => {
      if (value && value?.url) {
        if (
          value.url.includes('seller') &&
          this.sellerAuthService.sellerIsLoggedIn.value
        ) {
          this.headerType = 'seller';
        }
      } else {
        this.headerType = 'default';
      }
    });

    this.sellerAuthService.sellerUser.subscribe((value) => {
      this.sellerName = value.name.split(' ')[0];
    });
  }

  sellerLogout() {
    try {
      this.sellerAuthService.sellerUserLogout();
      this.router.navigate(['/']);
    } catch (error) {
      alert(error);
    }
  }

  //or we can use the (blur) event on the search input
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    // Check if the click was outside the nav-search element
    if (
      !this.elRef.nativeElement
        .querySelector('.nav-search')
        .contains(event.target as Node)
    ) {
      this.showSearch = false;
    }
  }

  onSearchChange() {
    // console.log(this.searchQuery);
    this.showSearch = true;
    this.headerService.getSearchProducts(this.searchQuery).subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status === 200) {
          let allProducts = response.body;
          this.filteredProducts = allProducts.filter((product: Product) =>
            product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          // console.log(this.filteredProducts);
        } else {
          alert(response.body);
        }
      },
      error: (error) => {
        alert(error.body);
      },
    });
  }

  toSearch() {
    this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
  }
}
