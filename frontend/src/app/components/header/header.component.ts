import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { SellerAuthService } from '../../auth-services/seller-auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  headerType: string = 'default';
  sellerName: string = '';
  constructor(
    private router: Router,
    private sellerAuthService: SellerAuthService
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
}
