import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'movie',
    loadComponent: () =>
      import('./movie/pages/movie-listing-page/movie-listing-page').then((c) => c.MovieListingPage),
  },
  {
    path: 'movie/create',
    loadComponent: () =>
      import('./movie/pages/movie-create-page/movie-create-page').then((c) => c.MovieCreatePage),
  },
  {
    path: 'movie/:id/update',
    loadComponent: () =>
      import('./movie/pages/movie-update-page/movie-update-page').then((c) => c.MovieUpdatePage),
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./users/pages/user-listing-page/user-listing-page').then((c) => c.UserListingPage),
  },
];
