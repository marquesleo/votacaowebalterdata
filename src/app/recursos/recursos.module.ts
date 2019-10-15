import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecursosListComponent } from './recursos-list/recursos-list.component';
import { SharedModule } from '../shared/shared.module';
import { RecursosCreateComponent } from './recursos-create/recursos-create.component';
import { RecursoUpdateComponent } from './recurso-update/recurso-update.component';
import { RecursosDeleteComponent } from './recursos-delete/recursos-delete.component';
 
@NgModule({
  imports: [ 
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        {path:'list',component:RecursosListComponent},
        {path:'create',component:RecursosCreateComponent},
        {path: 'update/:id', component: RecursoUpdateComponent},
        {path: 'delete/:id', component: RecursosDeleteComponent }
      
    ])
  ],
  declarations: [RecursosListComponent, RecursosCreateComponent, RecursoUpdateComponent, RecursosDeleteComponent]
})
export class RecursosModule { }