import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalComponent } from './pages/sucursal/sucursal.component';
import { PuntoVentaComponent } from './pages/punto-venta/punto-venta.component';
import { NavegarRoutingModule } from './navegar-routing.module';

@NgModule({
  declarations: [
    SucursalComponent,
    PuntoVentaComponent
  ],
  imports: [
    CommonModule,
    NavegarRoutingModule
  ]
})
export class NavegarModule { }
