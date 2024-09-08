import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from './search.service';
import { OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  filteredProducts: Product[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];
      this.searchService.getSearchProducts(this.searchQuery).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status === 200) {
            let allProducts = response.body;
            this.filteredProducts = allProducts.filter((product: Product) =>
              product.name
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())
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
    });
  }
}
