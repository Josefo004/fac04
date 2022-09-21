import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../factura/pages/home/home.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { PuntoVentaComponent } from './pages/punto-venta/punto-venta.component';
import { SucursalComponent } from './pages/sucursal/sucursal.component';
import { UnidadMedidaComponent } from './pages/unidad-medida/unidad-medida.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent, 
    children:[
      {path:'sucursal', component:SucursalComponent, data:{titulo:'Sucursal'}},
      {path:'puntoventa', component:PuntoVentaComponent, data:{titulo:'Punto de Venta'}},
      {path:'producto', component:ProductoComponent, data:{titulo:'Productos'}},
      {path:'unidadmendida', component:UnidadMedidaComponent, data:{titulo:'UnidadMedida'}},
      {path:'**', redirectTo:'sucursal'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmfacturaRoutingModule { }
