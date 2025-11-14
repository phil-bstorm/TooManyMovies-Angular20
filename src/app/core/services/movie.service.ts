import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponseList } from '@core/models/api-response.model';
import { MovieListing } from '@core/models/movie-listing.model';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly _httpClient = inject(HttpClient);

  getMovies(page: number = 1): Observable<ApiResponseList<MovieListing>> {
    // Récupère la liste des films avec pagination
    return this._httpClient.get<ApiResponseList<MovieListing>>(environment.apiUrl + '/movies', {
      // Paramètres de requête pour la pagination (rajoute ?page=1, ?page=2, etc. à l'URL)
      params: {
        page: page,
      },
    });
  }
}
