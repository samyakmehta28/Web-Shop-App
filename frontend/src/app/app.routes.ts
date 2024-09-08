import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [
  { component: HomeComponent, path: '' },
  {
    path: 'seller',
    loadChildren: () =>
      import('./pages/seller-pages/seller-pages.route').then(
        (m) => m.sellerRoutes
      ),
  },
  { component: SearchComponent, path: 'search' },
];
