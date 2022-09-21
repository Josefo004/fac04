import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes:Routes = [
  {
    path: 'auth', loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path: 'navegar', loadChildren: ()=>import('./navegar/navegar.module').then(m=>m.NavegarModule),
    canActivate:[AuthGuard],
    data: {
      permissions: {only: ['LOG', 'ADMIN'], redirectTo: '/403'}
    }
  },
  {
    path: 'factura', loadChildren: ()=>import('./factura/factura.module').then(m=>m.FacturaModule),
    canActivate:[AuthGuard],
    data: {
      permissions: {only: ['LOG', 'ADMIN'], redirectTo: '/403'}
    }
  },
  {
    path: 'admfactura', loadChildren: ()=>import('./admfactura/admfactura.module').then(m=>m.AdmfacturaModule),
    canActivate:[AuthGuard],
    data: {
      permissions: {only: ['LOG','ADMIN'], redirectTo: '/403'
      }
    }
  },
  {
    path: 'admusuario', loadChildren: ()=>import('./admuser/admuser.module').then(m=>m.AdmuserModule),
    canActivate:[AuthGuard],
    data: {
      permissions: {only: ['ADMIN'], redirectTo: '/403'
      }
    }
  },
  {
    path: '403', component: ErrorPageComponent
  },
  {
    path: '**', redirectTo: 'auth'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
