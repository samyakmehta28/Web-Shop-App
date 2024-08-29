import { Routes } from '@angular/router';
import { SellerSignupComponent } from './seller-signup/seller-signup.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { sellerHomeGuard } from '../../guards/seller-home.guard';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';

export const sellerRoutes: Routes = [
  { path: 'signup', component: SellerSignupComponent },
  { path: 'login', component: SellerLoginComponent },
  {
    path: 'home',
    component: SellerHomeComponent,
    canActivate: [sellerHomeGuard],
  },
  {
    path: 'add-product',
    component: SellerAddProductComponent,
    canActivate: [sellerHomeGuard],
  },
  {
    path: 'update-product/:id',
    component: SellerUpdateProductComponent,
    canActivate: [sellerHomeGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
