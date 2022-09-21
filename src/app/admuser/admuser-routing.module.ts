import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { HomeComponent } from '../factura/pages/home/home.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    canActivate:[NgxPermissionsGuard], 
    children: [
      {path: 'usuario', component: UsuarioComponent , data:{titulo:'Administración de Usuarios'}},
      {path: '**', redirectTo:'usuario'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmuserRoutingModule { }
