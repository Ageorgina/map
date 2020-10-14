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
    localStorage.setItem('user', JSON.stringify(this.cookieValue));
    this.currentUserSubject.next(this.cookieValue);
    return this.cookieValue;
  }

  deleteCookie(){
    this.cookieService.delete('user');
  }

  setCookie(username: string) {
    this.cookieService.set('user', username);
  }

  login(username: string, password: string): Observable<string> {
    //console.log('entro')
    // this.http.get<any>(`${environment.cartografiaBack}/login`+ {username, password}).pipe(map( x => {
    //   //console.log('entro', x)
    // }
    // ));
    // localStorage.setItem('currentUser', JSON.stringify(user));
    // this.currentUserSubject.next(user);
    const authfile = Base64.encode(username + '-' + password);
    console.log('=>', username + '-' + password, authfile);
    return this.http.get<string>(`${environment.cartografiaUrl}/data/auth/${authfile}.txt`);
  }
}
