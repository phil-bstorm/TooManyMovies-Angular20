import { JsonPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MovieListing } from '@core/models/movie-listing.model';
import { MovieService } from '@core/services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-listing-page',
  imports: [JsonPipe],
  templateUrl: './movie-listing-page.html',
  styleUrl: './movie-listing-page.scss',
})
export class MovieListingPage implements OnInit, OnDestroy {
  private readonly _movieService = inject(MovieService);

  total: number = 0;
  movies: MovieListing[] | null = null;
  moviesError: string | null = null;

  getMoviesSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.getMoviesSubscription = this._movieService.getMovies().subscribe({
      next: (data) => {
        setTimeout(() => {
          // traitement
          console.log(data);
          this.total = data.count;
          this.movies = data.data;
        }, 2000);
      },
      error: (err) => {
        console.error(err);
        this.moviesError = err.message;
      },
    });
  }

  ngOnDestroy(): void {
    this.getMoviesSubscription?.unsubscribe();
  }
}
