import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { SellerAuthService } from '../auth-services/seller-auth.service';
import { Router } from '@angular/router';

export const sellerHomeGuard: CanActivateFn = (route, state) => {
  const sellerAuthService = inject(SellerAuthService);
  const router = inject(Router);
  // console.log(sellerAuthService.sellerIsLoggedIn.value);
  return sellerAuthService.sellerIsLoggedIn.value
    ? true
    : router.navigateByUrl('/seller-auth');
};
