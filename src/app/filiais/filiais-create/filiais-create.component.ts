import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router } from '@angular/router';
import { FilialForCreation } from '../../_models/filialForCreation';

@Component({
  selector: 'app-filiais-create',
  templateUrl: './filiais-create.component.html',
  styleUrls: ['./filiais-create.component.css']
})
export class FiliaisCreateComponent implements OnInit {

  public errorMessage: string = '';
  public filialForm: FormGroup;
 

  constructor(private repository: RepositoryService, 
    private errorHandler: ErrorHandlerService, 
    private router: Router) { }

    ngOnInit() {
      this.filialForm = new FormGroup({
        nome: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        sigla: new FormControl('', [Validators.required, Validators.maxLength(2)])
       });
     
     }

     public createFilial(filialFormValue) {
      if (this.filialForm.valid) {
        this.executeFilialCreation(filialFormValue);
      }
    }
  
    private executeFilialCreation(filialFormValue) {
      let filialForCreation: FilialForCreation = {nome:"",sigla:""};
      filialForCreation.nome = filialFormValue.nome;
      filialForCreation.sigla = filialFormValue.sigla;
            
   
      let apiUrl = 'Filial';
      this.repository.create(apiUrl, filialForCreation)
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

}
