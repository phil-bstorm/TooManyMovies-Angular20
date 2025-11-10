import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { UserRegisterForm } from '@core/models/user-register-form.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isConnected: WritableSignal<boolean> = signal<boolean>(true);
  isConnected: Signal<boolean> = this._isConnected.asReadonly();

  login() {
    this._isConnected.set(true);
    // TODO call API avec credential
    // récupération du JWT
  }

  register(form: UserRegisterForm) {
    // TODO call API avec les données
    console.log('ENREGISTRER LE USER: ', form);
  }

  logout() {
    this._isConnected.set(false);
  }
}
