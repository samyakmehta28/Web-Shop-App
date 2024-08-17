import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SellerAuthComponent } from './pages/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { sellerHomeGuard } from './guards/seller-home.guard';

export const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: SellerAuthComponent, path: 'seller-auth' },
  {
    component: SellerHomeComponent,
    path: 'seller-home',
    canActivate: [sellerHomeGuard],
  },
];
