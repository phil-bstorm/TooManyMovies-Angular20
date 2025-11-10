import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

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

  logout() {
    this._isConnected.set(false);
  }
}
