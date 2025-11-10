import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingTable } from '@components/common/listing-table/listing-table';
import { MovieListing } from '@core/models/movie-listing.model';
import { MovieService } from '@core/services/movie.service';

@Component({
  selector: 'app-movie-listing-page',
  imports: [ListingTable],
  templateUrl: './movie-listing-page.html',
  styleUrl: './movie-listing-page.scss',
})
export class MovieListingPage implements OnInit {
  private readonly _movieService = inject(MovieService);
  private readonly _router = inject(Router);

  movies: MovieListing[] = [];

  ngOnInit(): void {
    this.movies = this._movieService.getMovies();
  }

  onClickDetails(id: string | number) {
    this._router.navigate(['/admin/movie', id, 'update']);
  }
}
