import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}).append('Authorization', 'Bearer ' +localStorage.getItem('token'))
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getUser(username) {
    return this.http.get(`${environment.cartografiaBack}` + '/usuario/' + username, httpOptions);
   }
   createUser(user){
    return this.http.post(`${environment.cartografiaBack}` + '/usuario/crear', user, httpOptions);
   }
   getUsers(){
    return this.http.get(`${environment.cartografiaBack}` + '/usuario' , httpOptions);

   }
}
