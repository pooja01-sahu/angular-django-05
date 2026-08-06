import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ServerStatusServices } from '../services/server-status.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const serverStatus = inject(ServerStatusServices);

  console.log('Interceptor Hit:', req.url);

  if (req.url.includes('/login/') || req.url.includes('/token/refresh/')) {
    return next(req).pipe(
      tap(() => {
        serverStatus.setServerDown(false);
      }),
      catchError((err) => {
        console.log('Error Status:', err.status);
        console.log(err);
        if (err.status === 0 || err.status === 500) {
          serverStatus.setServerDown(true);
        }
        if (err.status === 401 && authService.getRefreshToken()) {
          return authService.refreshToken().pipe(
            switchMap((res) => {
              authService.saveToken(res.access);
              return next(addToken(req, res.access));
            }),
            catchError((refreshErr) => {
              authService.logout();
              router.navigate(['/login']);
              return throwError(() => refreshErr);
            })
          );
        }
        return throwError(() => err);
      })
    );
  }

  const addToken = (r: HttpRequest<unknown>, token: string) => {
    const prefix = token.startsWith('eyJ') ? 'Bearer' : 'Token';
    return r.clone({ setHeaders: { Authorization: `${prefix} ${token}` } });
  };

  const token = authService.getToken();
  const authReq = token ? addToken(req, token) : req;

  return next(authReq).pipe(
    tap(() => {
      serverStatus.setServerDown(false);
    }),
    catchError((err) => {
      console.log('Error Status:', err.status);
      console.log(err);
      if (err.status === 0 || err.status === 500) {
        serverStatus.setServerDown(true);
      }
      if (err.status === 401 && authService.getRefreshToken()) {
        return authService.refreshToken().pipe(
          switchMap((res) => {
            authService.saveToken(res.access);
            return next(addToken(req, res.access));
          }),
          catchError((refreshErr) => {
            authService.logout();
            router.navigate(['/login']);
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => err);
    })
  );
};