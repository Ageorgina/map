import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import { Base64 } from 'js-base64';
import { map } from 'rxjs/operators';
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

  constructor(private http: HttpClient, private cookieService: CookieService) {
    localStorage.removeItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
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

  login(user: string, password: string) {
      return this.http.get<any>(`${environment.cartografiaBack}` + '/login?user=' + user + '&password=' + password)
             .pipe(map( user => {
               this.user = user.user;
              localStorage.setItem('user', JSON.stringify(this.user));
              this.currentUserSubject.next(this.user);
               console.log('USER ->',this.user)

      }));
   }
}
