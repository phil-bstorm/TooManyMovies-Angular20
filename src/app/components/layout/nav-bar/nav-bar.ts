import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { UserRole } from '@core/enums';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  // import de l'enum dans une propriété pour l'utiliser dans l'HTML
  UserRole = UserRole;

  // injection de dépendance
  private readonly _authService = inject(AuthService);

  // liaisons aux signals du service
  isConnected = this._authService.isConnected;
  role = this._authService.role;

  // méthode de déconnexion
  onClickLogout() {
    this._authService.logout();
  }
}
