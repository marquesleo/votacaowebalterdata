import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../_models/usuario';
import { EnviromentUrlService } from './enviroment-url.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,private envUrl: EnviromentUrlService) { }

    getAll() {
        return this.http.get<Usuario[]>(`${this.envUrl.urlAddress}/usuario`);
    }

    getById(id: number) {
        return this.http.get(`${this.envUrl.urlAddress}/usuario/` + id);
    }

    register(user: Usuario) {
        return this.http.post(`${this.envUrl.urlAddress}/usuario`, user);
    }

    update(user: Usuario) {
        return this.http.put(`${this.envUrl.urlAddress}/usuario/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.envUrl.urlAddress}/usuario/` + id);
    }
}
