import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { UserRole } from '@core/enums';
import { LoginResponse } from '@core/models/login-resonse.model';
import { Token } from '@core/models/token.model';
import { UserRegisterForm } from '@core/models/user-register-form.model';
import { environment } from '@env';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);

  private _isConnected: WritableSignal<boolean> = signal<boolean>(false);
  isConnected: Signal<boolean> = this._isConnected.asReadonly();

  private _role = signal<UserRole | null>(null);
  role = this._role.asReadonly();

  private _token = signal<string | null>(null);
  token = this._token.asReadonly();

  async login(email: string, password: string): Promise<void> {
    /* PREMIERE VERSION - PROMESSE */
    const promesse = firstValueFrom(
      this._httpClient.post<LoginResponse>(environment.apiUrl + 'auth/login', {
        email: email,
        password,
      }),
    );

    const response = await promesse;
    this._token.set(response.token);
    const tokenProp = jwtDecode<Token>(response.token);
    this._role.set(tokenProp.role);
    this._isConnected.set(true);
  }

  loginObservable(email: string, password: string): Observable<LoginResponse> {
    /* DEUXIEME VERSION - OBSERVABLE */
    return this._httpClient
      .post<LoginResponse>(environment.apiUrl + 'auth/login', {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this._token.set(response.token);
          const tokenProp = jwtDecode<Token>(response.token);
          this._role.set(tokenProp.role);
          this._isConnected.set(true);
        }),
      );
  }

  register(form: UserRegisterForm): Promise<void> {
    return firstValueFrom(this._httpClient.post<void>(environment.apiUrl + 'auth/register', form));
  }

  logout() {
    this._isConnected.set(false);
  }
}
