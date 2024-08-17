import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SellerSignupComponent } from './pages/seller-signup/seller-signup.component';
import { SellerHomeComponent } from './pages/seller-home/seller-home.component';
import { sellerHomeGuard } from './guards/seller-home.guard';
import { SellerLoginComponent } from './pages/seller-login/seller-login.component';

export const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: SellerSignupComponent, path: 'seller-signup' },
  { component: SellerLoginComponent, path: 'seller-login' },
  {
    component: SellerHomeComponent,
    path: 'seller-home',
    canActivate: [sellerHomeGuard],
  },
];
