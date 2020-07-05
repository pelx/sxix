import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { take, tap, switchMap } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.authService.userIsAuthenticated.pipe(
      take(1),
      switchMap((isAuth) => {
        console.log('AUTH GUARD isAuth: ', isAuth);
        if (!isAuth) {
          return this.authService.autologin();
        } else {
          console.log('NORMAL LOGIN');
          return of(isAuth);
        }
      }),
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
}
