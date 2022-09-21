import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmfacturaRoutingModule } from './admfactura-routing.module';

import { SucursalComponent } from './pages/sucursal/sucursal.component';
import { PuntoVentaComponent } from './pages/punto-venta/punto-venta.component';
import { ProductoComponent } from '../admfactura/pages/producto/producto.component';
import { UnidadMedidaComponent } from './pages/unidad-medida/unidad-medida.component';


@NgModule({
  declarations: [
    SucursalComponent,
    PuntoVentaComponent,
    ProductoComponent,
    UnidadMedidaComponent
  ],
  imports: [
    CommonModule,
    AdmfacturaRoutingModule
  ]
})
export class AdmfacturaModule { }
