import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponseList } from '@core/models/api-response.model';
import { UserListing } from '@core/models/user-listing.model';
import { environment } from '@env';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _httpClient = inject(HttpClient);

  getUsers(page: number = 1): Promise<ApiResponseList<UserListing>> {
    // Appel HTTP GET pour récupérer la liste des utilisateurs avec pagination
    return firstValueFrom(
      this._httpClient.get<ApiResponseList<UserListing>>(environment.apiUrl + '/users', {
        // Paramètres de requête pour la pagination (rajoute ?page=1, ?page=2, etc. à l'URL)
        params: {
          page: page,
        },
      }),
    );
  }
}
