import { Component, OnInit } from '@angular/core';
import { Recurso } from '../../_models/recurso';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recursos-delete',
  templateUrl: './recursos-delete.component.html',
  styleUrls: ['./recursos-delete.component.css']
})
export class RecursosDeleteComponent implements OnInit {

  public errorMessage: string = '';
  public recurso: Recurso;
 
constructor(private repository: RepositoryService, 
            private errorHandler: ErrorHandlerService, 
            private router: Router,
            private activeRoute: ActivatedRoute) { }
 


 ngOnInit() {
     this.getRecursoById();
  }
             
 private getRecursoById() {
     let id: string = this.activeRoute.snapshot.params['id'];
     let urlByIdUrl: string = `recursos/${id}`;
          
     this.repository.getData(urlByIdUrl)
     .subscribe(res => {
       this.recurso = res as Recurso;
     },
     (error) => {
         this.errorHandler.handleError(error);
         this.errorMessage = this.errorHandler.errorMessage;
     })
  }
             
  public redirectToRecursoList() {
    this.router.navigate(['/recursos/list']);
  }

  public deleteRecurso() {
    let deleteUrl: string = `recursos/${this.recurso.id}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }

}
