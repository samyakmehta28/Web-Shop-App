import { HomeService } from './home.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../../interfaces/product.interface';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 1, // Transition speed for navigation
    navText: ['', ''],
    slideTransition: 'linear',
    autoplay: true, // Automatically play the carousel
    autoplayTimeout: 3000, // Delay between each slide (3 seconds)
    autoplayHoverPause: true, // Pause on hover
    nav: true,
    items: 1, // Show only one item at a time
    responsive: {
      0: {
        items: 1, // Show 1 item for small screens
      },
      600: {
        items: 1, // Show 1 item for medium screens
      },
      1000: {
        items: 1, // Show 1 item for large screens
      },
    },
  };

  topProducts: Product[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getTopProducts().subscribe({
      next: (response: HttpResponse<any>) => {
        if (response.status == 200) {
          this.topProducts = response.body;
        }
      },
      error: (error) => {
        alert(error);
      },
    });
  }
}
