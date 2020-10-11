import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import { Base64 } from 'js-base64';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  cookies: any;
  cookieValue: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
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

  login(username: string, password: string): Observable<string> {

    const authfile = Base64.encode(username + '-' + password);
    console.log('=>', username + '-' + password, authfile);
    return this.http.get<string>(`${environment.cartografiaUrl}/data/auth/${authfile}.txt`);
  }
}
