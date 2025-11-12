import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const isNotConnectedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isConnected()) {
    return true;
  }

  // redirection vers home
  router.navigate(['/']);

  return false;
};
