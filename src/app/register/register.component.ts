import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService} from  '../shared/services/alert.service';
import { UsuarioService } from '../shared/services/usuario.service';
import { RepositoryService } from '../shared/services/repository.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { Filial } from '../_models/filial';
import { Usuario } from '../_models/usuario';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  login:boolean = false;
  private filiais :Filial[];
  private errorMessage:string;
  private usuarioId :string; 
  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UsuarioService,
      private alertService: AlertService,
      private repository:RepositoryService,
      private errorHandler: ErrorHandlerService,
      private activeRoute: ActivatedRoute) {
     
        if (this.activeRoute.snapshot.params['login'] != null)
          this.login = JSON.parse(this.activeRoute.snapshot.params['login']);
      
       }

       public Voltar(){
        let NovoUrl: string = `/login`;
         if (this.login==false)
          NovoUrl = '/usuario/list';

        
         this.router.navigate([NovoUrl]);
      }


  ngOnInit() {

  
    this.registerForm = this.formBuilder.group({
          nome: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          senha: ['', [Validators.required, Validators.minLength(6)]],
          idFilial: ['',[Validators.required]]
      });
      this.getAllFiliais();
      this.getUsuarioByCodigo();
  }


  public getAllFiliais():void{
    let apiAddress: string = "filial";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.filiais = res as Filial[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage  = this.errorHandler.errorMessage;
    })
  }

  private getUsuarioByCodigo() {
    let usuarioCodigo: string = this.activeRoute.snapshot.params['id'];
    
    if (usuarioCodigo != null){

    let usuarioByCodigoUrl: string = `Usuario/${usuarioCodigo}`;
    this.usuarioId =   usuarioCodigo;
    this.repository.getData(usuarioByCodigoUrl)
      .subscribe(res => {
        var usuario = new Usuario();
        usuario = res as Usuario;
          this.registerForm.patchValue(usuario);
        
          /*clienteForm.value.razao = cliente.razao;
        clienteForm.value.fantasia = cliente.fantasia;
        clienteForm.value.cnpj = cliente.cnpj;*/
        /*if (cliente.bloqueado == "SIM")
          this.clienteForm.controls['bloqueado'].patchValue(true);
        else
          this.clienteForm.controls['bloqueado'].patchValue(false);*/
     
     
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
    
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
      if (this.usuarioId == null)
      {
     
         this.userService.register(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.alertService.success('Cadastro realizado com sucesso!', true);
                  if (this.login==true)
                      this.router.navigate(['/login']);
                  else
                     this.router.navigate(["/usuario/list"]);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
        }else
        { 

          var usuario = new Usuario();
          usuario.email = this.registerForm.value.email;
          usuario.id = this.usuarioId;
          usuario.nome =   this.registerForm.value.nome;
          usuario.senha = this.registerForm.value.senha;
          usuario.idfilial =  this.registerForm.value.idFilial;

          this.userService.update(usuario)
          .subscribe(
           data => {
            this.alertService.success('Usuário alterado com sucesso!', true);
            this.router.navigate(["/usuario/list"]);
                              
           },
           (error => {
               this.errorHandler.handleError(error);
               this.errorMessage = this.errorHandler.errorMessage;
               this.loading = false;
           })
           );

        }
  }

}
