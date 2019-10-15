import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EnviromentUrlService } from './enviroment-url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,private envUrl: EnviromentUrlService) { }

    login(filial:string,email: string, senha: string) {
         return this.http.post<any>(`${this.envUrl.urlAddress}/Usuario/authenticate`,
         { email: email, senha: senha, idFilial:filial })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
