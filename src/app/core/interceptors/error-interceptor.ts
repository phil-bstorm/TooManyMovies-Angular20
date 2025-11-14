import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from '@core/models/api-error.model';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('errorInterceptor', error);

      /*
      if (error.status == 401) {
        router.navigate(['/', 'auth', 'login']);
      } else if (error.status == 403) {
        router.navigate(['/', 'error', '404']);
      } else if (error.status == 500 || error.status == 0) {
        router.navigate(['/', 'error', '500']);
      }*/

      switch (error.status) {
        case 401:
          router.navigate(['/', 'auth', 'login']);
          break;
        case 403:
          router.navigate(['/', 'error', '404']);
          break;
        case 500:
        case 0:
          router.navigate(['/', 'error', '500']);
          break;
        default:
        /* Nothing. */
      }

      return throwError(() => new ApiError(error.error.error));
    }),
  );
};
