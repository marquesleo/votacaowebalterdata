import { Component, OnInit } from '@angular/core';
import { Recurso } from '../../_models/recurso';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recursos-list',
  templateUrl: './recursos-list.component.html',
  styleUrls: ['./recursos-list.component.css']
})
export class RecursosListComponent implements OnInit {

  public recursos:Recurso[];
  public errorMessage: string = '';
 
  constructor(private repository:RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit() {
    this.getAllRecursos();
  }

  public getAllRecursos():void{
    let apiAddress: string = "recursos";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.recursos = res as Recurso[];
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage  = this.errorHandler.errorMessage;
    })
  }

  public redirectToUpdatePage(id){
    let updateUrl: string = `/recursos/update/${id}`;
    this.router.navigate([updateUrl]);
  }
  public redirectToDeletePage(id){
     let deleteUrl: string = `/recursos/delete/${id}`;
     this.router.navigate([deleteUrl]);
  }

}
