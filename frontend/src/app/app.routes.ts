import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SellerAuthComponent } from './pages/seller-auth/seller-auth.component';

export const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: SellerAuthComponent, path: 'seller-auth' },
];
