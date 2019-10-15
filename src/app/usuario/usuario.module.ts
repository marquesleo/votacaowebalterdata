import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { RegisterComponent } from '../register/register.component';
 
@NgModule({
  imports: [ 
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        {path:'list',component:UsuarioListComponent},
        {path:'create/:login',component:RegisterComponent},
        {path:'update/:id',component:RegisterComponent}
     
      
    ])
  ],
  declarations: [UsuarioListComponent,RegisterComponent]
})
export class UsuarioModule { }