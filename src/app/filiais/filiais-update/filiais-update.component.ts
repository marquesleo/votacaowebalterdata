import { Component, OnInit } from '@angular/core';
import { Filial } from '../../_models/filial';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filiais-update',
  templateUrl: './filiais-update.component.html',
  styleUrls: ['./filiais-update.component.css']
})
export class FiliaisUpdateComponent implements OnInit {

  public errorMessage: string = '';
  public filial: Filial;
  public filialForm: FormGroup;
  ;
  
  constructor(private repository: RepositoryService, 
    private errorHandler: ErrorHandlerService, 
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {

    this.filialForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      sigla: new FormControl('', [Validators.required, Validators.maxLength(2)])
     });

    this.getFilialById();
  }


  private getFilialById() {
    let id: string = this.activeRoute.snapshot.params['id'];
      
    let filialByIdUrl: string = `Filial/${id}`;
   
    this.repository.getData(filialByIdUrl)
      .subscribe(res => {
        this.filial = res as Filial;
        this.filialForm.patchValue(this.filial);
        
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }
 

public validateControl(controlName: string) {
  if (this.filialForm.controls[controlName].invalid && this.filialForm.controls[controlName].touched)
    return true;
 
  return false;
}
 
public hasError(controlName: string, errorName: string) {
  if (this.filialForm.controls[controlName].hasError(errorName))
    return true;
 
  return false;
}
 
public redirectToFiliaisList(){
  this.router.navigate(['/filiais/list']);
}

public updateFilial(filialFormValue) {
  if (this.filialForm.valid) {
    this.executeFilialUpdate(filialFormValue);
    this.redirectToFiliaisList();
  }
}
 
private executeFilialUpdate(filialFormValue) {
 
  this.filial.nome = filialFormValue.nome;
  this.filial.sigla = filialFormValue.sigla;
 
  let apiUrl = `filial/${this.filial.id}`;
  this.repository.update(apiUrl, this.filial)
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
