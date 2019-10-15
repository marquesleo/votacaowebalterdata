import { Component, OnInit } from '@angular/core';
import { Recurso } from '../../_models/recurso';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Filial } from '../../_models/filial';

@Component({
  selector: 'app-recurso-update',
  templateUrl: './recurso-update.component.html',
  styleUrls: ['./recurso-update.component.css']
})
export class RecursoUpdateComponent implements OnInit {

  public errorMessage: string = '';
  public recurso: Recurso;
  public recursoForm: FormGroup;

  public filiais:Filial[]  
  constructor(private repository: RepositoryService, 
    private errorHandler: ErrorHandlerService, 
    private router: Router,
    private activeRoute: ActivatedRoute) { }

    
  ngOnInit() {

    this.recursoForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      idFilial:  new FormControl('',[Validators.required])
     });
    this.getAllFiliais();
    this.getRecursoById();
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

  private getRecursoById() {
    let id: string = this.activeRoute.snapshot.params['id'];
      
    let recursoByIdUrl: string = `Recursos/${id}`;
   
    this.repository.getData(recursoByIdUrl)
      .subscribe(res => {
        this.recurso = res as Recurso;
        this.recursoForm.patchValue(this.recurso);
        
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
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

public updateRecurso(recursoFormValue) {
  if (this.recursoForm.valid) {
    this.executeRecursoUpdate(recursoFormValue);
  }
}
 
private executeRecursoUpdate(recursoFormValue) {
 
  this.recurso.nome = recursoFormValue.nome;
  this.recurso.idFilial = recursoFormValue.idFilial;
 
  let apiUrl = `recursos/${this.recurso.id}`;
  this.repository.update(apiUrl, this.recurso)
    .subscribe(res => {
      $('#successModal').modal();
    },
    (error => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  )
}

}
