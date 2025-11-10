import { Routes } from '@angular/router';
import { MovieListingPage } from './features/movie/pages/movie-listing-page/movie-listing-page';

export const routes: Routes = [
  {
    path: '',
    component: MovieListingPage,
  },
  {
    path: 'movie',
    loadChildren: () => import('./features/movie/movie.routes').then((r) => r.routes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((r) => r.routes),
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then((r) => r.routes),
  },
];
