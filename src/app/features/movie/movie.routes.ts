import { Routes } from '@angular/router';
import { isConnectedGuard } from '@core/guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/movie-listing-page/movie-listing-page').then((c) => c.MovieListingPage),
  },
  {
    path: ':id',
    canActivate: [isConnectedGuard],
    loadComponent: () =>
      import('./pages/movie-details-page/movie-details-page').then((c) => c.MovieDetailsPage),
  },
];
