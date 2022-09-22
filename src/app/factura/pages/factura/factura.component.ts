import { Component, OnInit, ViewChild } from '@angular/core';
import { AutocompleteComponent } from 'angular-ng-autocomplete';
import { TProducto, TProductoV, TpuntoVenta, TRazonSocial, Tsucursal, TVenta } from 'src/app/interfaces/interfaces';
import { NavegarService } from 'src/app/navegar/services/navegar.service';
import { ProductosService } from '../../services/productos.service';
import { RazonSocialService } from '../../services/razon-social.service';
import { VentasService } from '../../services/ventas.service';
import { DetalleVentaService } from '../../services/detalle-venta.service';
import { Router } from '@angular/router';

import jsPDF from 'jspdf' 
import { DatePipe } from '@angular/common';
import { Utils } from '../../services/utils.service';
import { ImprimirService } from '../../services/imprimir.service';


@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styles: [`
    .ng-autocomplete{
      padding:0;
      border:0;
      border: 1px solid #ced4da;
    }
  `]
})
export class FacturaComponent implements OnInit  {

  @ViewChild('auto') auto!:AutocompleteComponent;

  rsnameM        : string='';
  emilio         : string='';
  nroDocumentoM  : string='';
  tipoDocM       : string='';
  productos!     : TProducto[];
  productoSelect!: TProducto;
  productosVende : TProductoV[]=[];


  cantidadP      : number = 0; 
  unidadP        : string | undefined;
  precioUP       : number | undefined;
  totalV         : number = 0;
  facturar       : boolean = true;

  razonSocial!   : TRazonSocial;
  ventaSave!     : TVenta;
  hayError       : Boolean = false;
  imprimirB      : boolean = false;

  ////////////////////////////////////////
  //
  detalleVenta : TProductoV[]=[];
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
  //
  ////////////////////////////////////////


  get titulo (){
    return this.navegarservice.titulo;
  }

  iniciarRazonSocial(rs:string, nd:string, td:string){
    this.razonSocial={
      id          :0,
      nroDocumento:nd,
      razonSocial :rs,
      tipoDoc     :td
    }
  }

  /* get razonSocial(){
    return this.razonSocialService.razonSocial;
  } */

  termino:string='';


  constructor(private navegarservice: NavegarService,
              private razonSocialService: RazonSocialService,
              private productosService: ProductosService,
              private ventasService: VentasService,
              private detalleVentasService: DetalleVentaService,
              private router: Router,
              private imprimirService: ImprimirService) { 
  }
  
  ngOnInit(): void {
    this.iniciarRazonSocial(this.rsnameM.toUpperCase(), this.nroDocumentoM, this.tipoDocM);
    this.productosService.productosPorPVenta()
      .subscribe(rProV => {
        this.productos = rProV;
        console.log(rProV);
      });
  }

  buscarRazonSocial(termino:string){
    //console.log(termino);
    this.termino = termino;
    this.razonSocialService.buscarRazon(this.termino)
      .subscribe(resp=>{
        if (resp.length>0) {
          this.razonSocial=resp[0]
        } 
        else{
          this.iniciarRazonSocial(this.rsnameM.toUpperCase(), this.nroDocumentoM, this.tipoDocM);
        }
      });
  }

  llamaramodal(){
    this.rsnameM ='';
    this.nroDocumentoM = ''; 
    this.tipoDocM = ''
    this.emilio = '';
  }

  //guarda la nueva razon social con datos de la ventana modal
  colocar(){ 
    // this.razonSocialService.sRazonSocial(this.rsnameM.toUpperCase(), this.nroDocumentoM, this.tipoDocM);
    // console.log(this.razonSocial);
    // this.termino=this.nroDocumentoM;
    const newRazon : TRazonSocial={
      razonSocial:  this.rsnameM.toUpperCase(),
      nroDocumento: this.nroDocumentoM,
      tipoDoc:      this.tipoDocM
    };

    
    if (newRazon.nroDocumento.length>0&&newRazon.nroDocumento.length>3&&newRazon.tipoDoc.length>0) {
      this.razonSocialService.guardarRazon(newRazon)
        .subscribe(resp=>this.razonSocial=resp);
      this.termino = newRazon.nroDocumento;
    }

  }

  ///////////////////////////////////////////////////
  ////////////////////
  campo = 'producto';
  ////////////////////


  selectEvent(item: TProducto) {
    console.log(item);
    this.productoSelect = item;
    this.unidadP = item.unidad;
    this.precioUP =  item.precioUnitario;
  }

  limpiarP(){
    this.cantidadP = 0;
    this.unidadP   = undefined;
    this.precioUP  = undefined;
    this.productoSelect.id=0;
  }

  clearedEvent(){
    console.log('LIMPIESITO');
    this.limpiarP();
  }

  agregar(){
    let unProducto:TProductoV={
      producto       : this.productoSelect.producto,
      unidad         : this.productoSelect.unidad,
      precioUnitario : Number(this.precioUP),
      cantidad       : this.cantidadP,
      sucursalId     : this.productoSelect.sucursalId,
      puntoVentaId   : this.productoSelect.puntoVentaId,
      ventaId        : 0
    }
    this.productosVende.push(unProducto);
    console.log('nuevo producto ',this.productosVende);
    this.auto.clear();
    this.auto.close();
    this.auto.focus();
    this.clearedEvent();
    this.totalProductos();
  }
  ///////////////////////////////////////////////////

  quitar(i:number){
    console.log('QUITAR',i);
    this.productosVende.splice(i,1);
    console.log(this.productosVende);
    this.totalProductos();
  }

  totalProductos(){
    let k = this.productosVende.length;
    this.totalV = 0;
    for (let i = 0; i < k; i++) {
      this.totalV+=this.productosVende[i].cantidad*this.productosVende[i].precioUnitario;
    }
  }

  guardarVenta(){
    if (this.razonSocial.id!=0 && this.productosVende.length>0) {
      this.hayError = false;
      let ventaNueva: TVenta = {
        id          : 0,
        razonSocial : this.razonSocial.razonSocial,
        fechHora    : new Date(),
        monto       : this.totalV,
        nroDocumento: this.razonSocial.nroDocumento,
        estado      : this.facturar,
        puntoVentaId: parseInt(this.navegarservice.puntoVentaN[0],10) 
      }
  
      this.ventasService.guardarVenta(ventaNueva)
        .subscribe(resp => {
          this.ventaSave = resp;
          console.log('NUEVA VENTA', resp);
          let k = this.productosVende.length;
          for (let i = 0; i < k; i++) {
            this.productosVende[i].ventaId = this.ventaSave.id;
            this.detalleVentasService.guardarUnDetalle(this.productosVende[i])
              .subscribe(resp => console.log('DETALLE VENDIDO', resp));
          }
          this.imprimirService.para_imprimir(this.ventaSave.id);
          //this.router.navigate([`./factura`]);
          this.imprimirB = true;
        });
    }
    else {
      this.hayError = true;
      this.imprimirB = false;
    }
  }

  imprimirt(){
    this.imprimirService.imprimir_Ticket();
    this.router.navigate([`./factura`]);
  }
}
