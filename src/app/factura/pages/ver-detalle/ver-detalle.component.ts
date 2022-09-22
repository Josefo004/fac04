import { Component, OnInit } from '@angular/core';

import { TProductoV, TpuntoVenta, Tsucursal, TVenta } from 'src/app/interfaces/interfaces';
import { DetalleVentaService } from '../../services/detalle-venta.service';
import { VentasService } from '../../services/ventas.service';
import { NavegarService } from '../../../navegar/services/navegar.service';
import { ImprimirComponent } from '../imprimir/imprimir.component';

@Component({
  selector: 'app-ver-detalle',
  templateUrl: './ver-detalle.component.html',
  styles: [
  ]
})
export class VerDetalleComponent implements OnInit {

  detalleVenta : TProductoV[]=[];
  totalV       : number = 0;
  venta        : TVenta = {
    id: 0,
    razonSocial: '',
    fechHora: new Date(),
    monto: 0,
    nroDocumento: '',
    estado: false,
    puntoVentaId: 0
  }

  sucursalS     : Tsucursal = {
    id: 0,
    nroSucursal: 0,
    nombre: '',
    direccion: '',
    telefono: '',
    created_at: new Date(),
    updated_at: new Date()
  }

  puntoVentaS : TpuntoVenta = {
    id: 0,
    codigoPuntoVenta: 0,
    nombrePuntoVenta: '',
    tipoPuntoVenta: '',
    sucursalId: 0
  }

  get titulo (){
    return this.navegarservice.titulo;
  }

  get idVenta (){
    return this.ventasService.idVenta;
  }

  constructor(private ventasService: VentasService,
              private detalleVentasService: DetalleVentaService,
              private navegarservice: NavegarService) { }

  ngOnInit(): void {
    this.ventasService.buscarUnaVenta(this.idVenta)
      .subscribe(resp => {
        this.venta = resp;
        console.log('VENTA ',this.venta);
        this.navegarservice.unPunto(this.venta.puntoVentaId)
          .subscribe(resp => {
            this.puntoVentaS = resp;
            console.log(this.puntoVentaS);
            this.navegarservice.unaSucursal(this.puntoVentaS.sucursalId)
              .subscribe(resp => {
                this.sucursalS = resp;
                console.log(this.sucursalS);
              })
          });
      });
    this.detalleVentasService.tomarDetalle(this.idVenta)
      .subscribe(resp => {
        this.detalleVenta = resp;
        console.log(this.detalleVenta);
        this.totalProductos();
      });
  }

  totalProductos(){
    let k = this.detalleVenta.length;
    this.totalV = 0;
    for (let i = 0; i < k; i++) {
      this.totalV+=this.detalleVenta[i].cantidad*this.detalleVenta[i].precioUnitario;
    }
  }

  imprimir(){
    this.ventasService.sidVenta(this.venta.id);
    ImprimirComponent
    // this.imprimirService.para_imprimir();
    // this.imprimirService.imprimir_Ticket();
  }

 
}
