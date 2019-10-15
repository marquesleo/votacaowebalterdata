import { Component, OnInit } from '@angular/core';
import { Filial } from '../../_models/filial';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filiais-delete',
  templateUrl: './filiais-delete.component.html',
  styleUrls: ['./filiais-delete.component.css']
})
export class FiliaisDeleteComponent implements OnInit {
  public errorMessage: string = '';
  public filial: Filial;
 
constructor(private repository: RepositoryService, 
            private errorHandler: ErrorHandlerService, 
            private router: Router,
            private activeRoute: ActivatedRoute) { }
 


 ngOnInit() {
     this.getRecursoById();
  }
             
 private getRecursoById() {
     let id: string = this.activeRoute.snapshot.params['id'];
     let urlByIdUrl: string = `filial/${id}`;
          
     this.repository.getData(urlByIdUrl)
     .subscribe(res => {
       this.filial = res as Filial;
     },
     (error) => {
         this.errorHandler.handleError(error);
         this.errorMessage = this.errorHandler.errorMessage;
     })
  }
             
  public redirectToFiliaisList() {
    this.router.navigate(['/filiais/list']);
  }

  public deleteFilial() {
    let deleteUrl: string = `filial/${this.filial.id}`;
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
