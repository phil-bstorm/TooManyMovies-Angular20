import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponseList } from '@core/models/api-response.model';
import { MovieListing } from '@core/models/movie-listing.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly _httpClient = inject(HttpClient);

  getMovies(/* TODO pagination */): Observable<ApiResponseList<MovieListing>> {
    // CALL API
    return this._httpClient.get<ApiResponseList<MovieListing>>('http://localhost:3000/movie');
  }
}
