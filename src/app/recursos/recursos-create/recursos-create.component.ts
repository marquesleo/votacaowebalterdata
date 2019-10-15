import { Component, OnInit } from '@angular/core';
import { Recurso } from '../../_models/recurso';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router } from '@angular/router';
import { RecursoForCreation } from '../../_models/recursoForCreation';
import { Filial } from '../../_models/filial';

@Component({
  selector: 'app-recursos-create',
  templateUrl: './recursos-create.component.html',
  styleUrls: ['./recursos-create.component.css']
})
export class RecursosCreateComponent implements OnInit {

  public errorMessage: string = '';
  public recursoForm: FormGroup;
  public filiais:Filial[];

  constructor(private repository: RepositoryService, 
    private errorHandler: ErrorHandlerService, 
    private router: Router) { }

    ngOnInit() {
     
      this.recursoForm = new FormGroup({
        nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        idFilial:  new FormControl('',[Validators.required])
       });
       this.getAllFiliais();
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


     public createRecurso(recursoFormValue) {
      if (this.recursoForm.valid) {
        this.executeRecursoCreation(recursoFormValue);
      }
    }
  
    private executeRecursoCreation(recursoFormValue) {
      let recursoForCreation: RecursoForCreation = {nome:"",idFilial:""};
      recursoForCreation.nome = recursoFormValue.nome;
      recursoForCreation.idFilial = recursoFormValue.idFilial;
         
   
      let apiUrl = 'Recursos';
      this.repository.create(apiUrl, recursoForCreation)
        .subscribe(res => {
          $('#successModal').modal();
         
        },
        (error => {
          this.errorHandler.handleError(error);
          
          this.errorMessage = this.errorHandler.errorMessage;
          $('#errorModal').modal();
        })
      )
    }
     
   public validateControl(controlName: string) {
      if (this.recursoForm.controls[controlName].invalid && this.recursoForm.controls[controlName].touched)
        return true;
   
      return false;
    }
   
    public hasError(controlName: string, errorName: string) {
      if (this.recursoForm.controls[controlName].hasError(errorName))
        return true;
   
      return false;
    }
      
    public redirectToRecursoList(){
      this.router.navigate(['/recursos/list']);
    }
  
    compararFiliais(filial1, filial2){
      return filial1 === filial2;  
    }

}
