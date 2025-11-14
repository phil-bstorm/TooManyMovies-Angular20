import { HttpClient } from '@angular/common/http';
import {
  computed,
  effect,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
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

  // private _isConnected: WritableSignal<boolean> = signal<boolean>(false);
  // isConnected: Signal<boolean> = this._isConnected.asReadonly();
  isConnected: Signal<boolean> = computed(() => !!this.token());
  /*
    if(this.token().length > 0){
      return true;
    }else {
      return false;
    }
  */

  private _role = signal<UserRole | null>(null);
  role = this._role.asReadonly();

  private _token = signal<string | null>(null);
  token = this._token.asReadonly();

  constructor() {
    // Récupération du token depuis le localstorage
    const tokenStr = localStorage.getItem('token');

    if (tokenStr) {
      this._token.set(tokenStr);
      /* Fait dans le effect
      const tokenProp = jwtDecode<Token>(tokenStr);
      this._role.set(tokenProp.role);*/
      // this._isConnected.set(true); // fait par computed
    }

    effect(() => {
      const token = this._token();
      if (token == null) {
        localStorage.removeItem('token');
        this._role.set(null);
      } else {
        localStorage.setItem('token', token);
        const tokenProp = jwtDecode<Token>(token);
        this._role.set(tokenProp.role);
      }
    });

    effect(() => {
      const role = this._role();
      console.log('NOUVEAU ROLE', role);
    });
  }

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
    /* Fait dans le effect
    localStorage.setItem('token', response.token);
    const tokenProp = jwtDecode<Token>(response.token);
    this._role.set(tokenProp.role);*/

    // this._isConnected.set(true); // fait dans le computed
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
          /* fait dans le effect
          const tokenProp = jwtDecode<Token>(response.token);
          this._role.set(tokenProp.role);
          */
          // this._isConnected.set(true); // fait dans le computed
        }),
      );
  }

  register(form: UserRegisterForm): Promise<void> {
    return firstValueFrom(this._httpClient.post<void>(environment.apiUrl + 'auth/register', form));
  }

  logout() {
    // this._isConnected.set(false); // fait dans le computed
    // this._role.set(null); // fait dans le effect
    this._token.set(null);

    // localStorage.removeItem('token'); // fait dans le effect
  }
}
