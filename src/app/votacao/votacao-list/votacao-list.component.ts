import { Component, OnInit } from '@angular/core';
import { RecursoASerVotado } from 'src/app/_models/RecursoASerVotado';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/_models/usuario';
import { Recurso } from 'src/app/_models/Recurso';
import { FormBuilder, FormGroup } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

@Component({
  selector: 'app-votacao-list',
  templateUrl: './votacao-list.component.html',
  styleUrls: ['./votacao-list.component.css']
})
export class VotacaoListComponent implements OnInit {
  currentUser: Usuario;
  errorMessage : string;
  loading = false;
  submitted = false;
  teamForm: FormGroup;
  public RecursoParaVotacao:RecursoASerVotado[];
  displayedColumns = ['voto', 'recurso', 'observacao'];
  
  dataSource = new MatTableDataSource<RecursoASerVotado>();
  selection = new SelectionModel<RecursoASerVotado>(false, []);

  constructor(private repository:RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private formBuilder: FormBuilder) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.teamForm = this.formBuilder.group({
        memberDetails: this.formBuilder.array([])
      });
     }

   isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

      /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

 
  ngOnInit() {
    this.getAllRecursos();
   
  }


 public getAllRecursos():void{

  
     let recursosUrl: string = `Recursos/recursosnaovotados/${this.currentUser.id}`;
   
    this.repository.getData(recursosUrl)
    .subscribe(res => {
    // this.RecursoParaVotacao = res as RecursoASerVotado[] ;
     this.dataSource.data = res as RecursoASerVotado[]
     /*this.RecursoParaVotacao = new Array(votacao.length-1);
     votacao.forEach(obj => {
       obj.selecionado =false;
       obj.nome = 
       obj.observacao= "";
       this.RecursoParaVotacao.push(obj);
     })*/
      
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage  = this.errorHandler.errorMessage;
    })
  }

  onSubmit() {
    this.submitted = true;
  
    
    this.loading = true;
    if (this.RecursoParaVotacao != null)
    {
       var votacao: RecursoASerVotado[];
       this.RecursoParaVotacao.forEach(obj => {
         if (obj.selecionado == true){
            obj.idusuario = this.currentUser.id;
            votacao.push(obj);
         };
       });
      
       this.repository.create("VotacaoDoRecurso",votacao)
       .subscribe(res => {
        $('#successModal').modal();
       
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
        this.loading = false;
        $('#errorModal').modal();
      })
    )
    }
  }

}
