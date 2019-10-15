import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/_models/usuario';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  public usuarios:Usuario[];
  public errorMessage: string = '';
  constructor(private repository:RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit() {
    this.getAllUsuarios();
  }

  public getAllUsuarios():void{
    let apiAddress: string = "Usuario";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.usuarios = res as Usuario[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage  = this.errorHandler.errorMessage;
    })
  }

  public redirectToUpdatePage(id){
    let updateUrl: string = `/usuario/update/${id}`;
    this.router.navigate([updateUrl]);
  }
  public redirectToDeletePage(id){
     let deleteUrl: string = `/usuario/delete/${id}`;
     this.router.navigate([deleteUrl]);
  }

  public novoUsuario(login){
    let NovoUrl: string = `/usuario/create/${login}`;
     this.router.navigate([NovoUrl]);
  }

  

  

}
