import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {AuthenticationService} from '../../general/services/authentication.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad, CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cookie = this.authService.getCOOKIE();
    if (cookie) {
      return true;
    }
    this.router.navigate(['login'], {queryParams: {returnUrl: 'home'}});
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const cookie = this.authService.getCOOKIE();
    if (cookie) {
      return true;
    }
    this.router.navigate(['login'], {queryParams: {returnUrl: 'home'}});
    return false;
  }


}
