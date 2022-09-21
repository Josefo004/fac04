import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturaComponent } from './pages/factura/factura.component';
import { FindFacturaComponent } from './pages/find-factura/find-factura.component';
import { HomeComponent } from './pages/home/home.component';
import { VerDetalleComponent } from './pages/ver-detalle/ver-detalle.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'findfactura', component: FindFacturaComponent , data:{titulo:'Buscar Factura'}},
      {path: 'factura', component: FacturaComponent, data:{titulo:'Hacer Factura'}},
      {path: 'verdetalle', component: VerDetalleComponent, data:{titulo:'Hacer Factura'}},
      {path: '**', redirectTo: 'findfactura'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
