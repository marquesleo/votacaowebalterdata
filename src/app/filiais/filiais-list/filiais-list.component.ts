import { Component, OnInit } from '@angular/core';
import { Filial } from '../../_models/filial';
import { RepositoryService } from '../../shared/services/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filiais-list',
  templateUrl: './filiais-list.component.html',
  styleUrls: ['./filiais-list.component.css']
})
export class FiliaisListComponent implements OnInit {

  public filiais:Filial[];
  public errorMessage: string = '';
 
  constructor(private repository:RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit() {
    this.getAllFilial();
  }

  public getAllFilial():void{
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

  public redirectToUpdatePage(id){
    let updateUrl: string = `/filiais/update/${id}`;
    this.router.navigate([updateUrl]);
  }
  public redirectToDeletePage(id){
     let deleteUrl: string = `/filiais/delete/${id}`;
     this.router.navigate([deleteUrl]);
  }

}
