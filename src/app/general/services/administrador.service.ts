import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  carpetajson: string;

  constructor(private http: HttpClient) {

   }
   checkDistrito(username, password, viewNewUser) {
    return this.http.get<any[]>(`${environment.cartografiaBack}` + '/login/admin?user='
     + username + '&password=' + password + '&viewNewUser=' + viewNewUser );
  }
}
