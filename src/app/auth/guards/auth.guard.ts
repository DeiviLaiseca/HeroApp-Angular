import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanMatch {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {};

  checkAuthenticated(): Observable<boolean> | boolean{
    return this.authService.checkAuthenticated()
      .pipe(
        tap( isAuthenticated => {
          if( !isAuthenticated ){
            this.router.navigate(['/auth/login'])
          }
        }
        )
      )
  }

   canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.checkAuthenticated();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.checkAuthenticated();
  }

}
