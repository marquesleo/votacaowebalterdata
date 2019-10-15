import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FiliaisListComponent } from './filiais-list/filiais-list.component';
import { FiliaisCreateComponent } from './filiais-create/filiais-create.component';
import { FiliaisUpdateComponent } from './filiais-update/filiais-update.component';
import { FiliaisDeleteComponent } from './filiais-delete/filiais-delete.component';
 
@NgModule({
  imports: [ 
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        {path:'list',component:FiliaisListComponent},
        {path:'create',component:FiliaisCreateComponent},
        {path: 'update/:id', component: FiliaisUpdateComponent},
        {path: 'delete/:id', component: FiliaisDeleteComponent }
      
    ])
  ],
  declarations: [FiliaisListComponent, 
                 FiliaisCreateComponent, 
                 FiliaisUpdateComponent,
                 FiliaisDeleteComponent]
})
export class FiliaisModule { }