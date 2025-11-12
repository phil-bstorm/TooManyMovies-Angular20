import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const isConnectedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isConnected()) {
    return true;
  }

  // navigate vers page login
  router.navigate(['/', 'auth', 'login']);
  return false;
};
