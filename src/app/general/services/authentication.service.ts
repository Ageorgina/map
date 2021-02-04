import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  cookies: any;
  cookieValue: string;
  response: any;
  user: any;

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) {
  }
  getCOOKIE() {
    this.cookieValue = this.cookieService.get('user');

    return this.cookieValue;
  }

  deleteCookie(){
    this.cookieService.delete('user');
  }

  setCookie(username: string) {
    this.cookieService.set('user', username);
  }

  login(user) {
    return this.http.post(`${environment.cartografiaBack}` + '/login' , user);
   }
   logout(){
     localStorage.removeItem('user');
     localStorage.removeItem('username');
     localStorage.removeItem('partido');
     localStorage.removeItem('token');
     localStorage.removeItem('estado');
     localStorage.removeItem('distrito');

   }
}
