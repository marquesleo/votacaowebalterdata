import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_directives/_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { VotacaoListComponent } from './votacao/votacao-list/votacao-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register/:login', component: RegisterComponent },
  { path: 'recursos', loadChildren: "./recursos/recursos.module#RecursosModule" },
  { path: 'filiais', loadChildren: "./filiais/filiais.module#FiliaisModule" },
  {path: 'usuario',loadChildren:"./usuario/usuario.module#UsuarioModule"},
  {path: 'votacao/list',component: VotacaoListComponent},
  { path: '404', component : NotFoundComponent},
  { path: '500', component: InternalServerComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full'},
 

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
