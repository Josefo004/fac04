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
              private utils: Utils) { 
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
          console.log(resp);
          let k = this.productosVende.length;
          for (let i = 0; i < k; i++) {
            this.productosVende[i].ventaId = this.ventaSave.id;
            this.detalleVentasService.guardarUnDetalle(this.productosVende[i])
              .subscribe(resp => console.log('DETALLE VENDIDO', resp));
          }
          this.para_imprimir();
          //this.router.navigate([`./factura`]);
          this.imprimirB = true;
        });
    }
    else {
      this.hayError = true;
      this.imprimirB = false;
    }
  }

  para_imprimir(){
    this.ventasService.buscarUnaVenta(this.ventaSave.id)
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
    this.detalleVentasService.tomarDetalle(this.ventaSave.id)
      .subscribe(resp => {
        this.detalleVenta = resp;
        console.log(this.detalleVenta);
        this.totalProductos();
      });
  }


  imprimirt(){
    console.log('IMPRIMIR');
    
    let ancho = 104;
    let alto = 110;
    let kk = this.detalleVenta.length
    if (kk>1) alto = 100 + (6*kk);
    let doc = new jsPDF ('p', 'mm', [alto, ancho]);
    let posy = 0;
    doc.addImage('/assets/dist/img/logo_app_gadch.png','PNG', 1, 1, 15, 15);

    function centrarTxt(txt:string){
      posy = posy + 3;
      doc.setFontSize(7).setFont('courier', 'normal').text(txt, ancho/2, posy, {align: 'center'});  
    }

    function centrarTxtB(txt:string){
      posy = posy + 3;
      doc.setFontSize(8).setFont('courier', 'bold').text(txt, ancho/2, posy, {align: 'center'});  
    }

    function pardeText(txt1:string, txt2:string){
      posy = posy + 3;
      doc.setFontSize(8).setFont('courier', 'bold').text(txt1 , 45, posy, {align:'right'});
      doc.setFontSize(7).setFont('courier', 'normal').text(txt2, 47, posy, {align:'left'});
    }

    function sItem(dx:TProductoV){
      let tparcial = dx.precioUnitario * dx.cantidad;
      posy = posy + 3;
      doc.setFontSize(8).setFont('courier', 'bold').text('00000'+dx.id+' - '+dx.producto, 5, posy, {align:'left'});
      posy = posy + 3;
      doc.setFontSize(7).setFont('courier', 'normal').text(dx.cantidad+' - '+dx.unidad, 10, posy, {align:'left'});
      doc.setFontSize(7).setFont('courier', 'normal').text(dx.precioUnitario.toFixed(2)+'', 65, posy, {align:'right'});
      doc.setFontSize(7).setFont('courier', 'normal').text(tparcial.toFixed(2)+'', 90, posy, {align:'right'});
    }

    function total(tt:number){
      posy = posy + 4;
      doc.setFontSize(9).setFont('courier', 'bold').text('TOTAL', 63, posy, {align:'left'});
      doc.setFontSize(7).setFont('courier', 'bold').text(tt.toFixed(2), 90, posy, {align:'right'});
    }

    function lineaDash(){
      posy = posy + 2;
      doc.setLineDashPattern([2,1],1);
      doc.line(4,posy,100,posy);
      posy = posy + 1;
    } 

    function linea(){
      posy = posy + 1;
      doc.setLineDashPattern([0,0],1);
      doc.line(4,posy,100,posy);
    }

    doc.setFontSize(15).setFont('courier', 'bold').text('FACTURA', ancho/2, 15, {align: 'center'});
    doc.setFontSize(8).setFont('courier', 'normal').text("(Con Derecho a Crédito Fiscal)", ancho/2,19, {align:'center'});
    doc.setFontSize(11).setFont('courier', 'bold').text('GOBIERNO AUTONOMO DEPARTAMENTAL', ancho/2, 24, {align: 'center'});
    doc.setFontSize(11).setFont('courier', 'bold').text('DE CHUQUISACA', ancho/2, 28, {align: 'center'});
    posy = 29;
    centrarTxt(this.sucursalS.nombre);
    centrarTxt(this.puntoVentaS.nombrePuntoVenta);
    centrarTxt(this.sucursalS.direccion);
    lineaDash();

    pardeText('NIT','175982026');
    pardeText('No Factura', this.venta.id+'');
    pardeText('cod. Autorización','ASHKJDHYER213482762345');
    lineaDash();

    pardeText('Nombre/Razón Social', this.venta.razonSocial);
    pardeText('NIT/CI/CEX', this.venta.nroDocumento);
    pardeText('Cod Cliente', this.puntoVentaS.codigoPuntoVenta+''); //revisar
    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedDate = datepipe.transform(this.venta.fechHora, 'dd-MM-YYYY HH:mm:ss'); 
    if (formattedDate!=null) {
      pardeText('Fecha - Hora', formattedDate);
    }
    lineaDash();

    posy = posy + 5;
    doc.setFontSize(12).setFont('courier', 'bold').text('DETALLE', ancho/2, posy, {align: 'center'});
    posy = posy + 3;
    doc.setFontSize(8).setFont('courier', 'bold').text('CANTIDAD', 10, posy, {align:'left'});
    doc.setFontSize(8).setFont('courier', 'bold').text('PRECIO UNITARIO', 65, posy, {align:'right'});
    doc.setFontSize(8).setFont('courier', 'bold').text('SUB TOTAL', 90, posy, {align:'right'});
    linea();
    let k = this.detalleVenta.length;
    for (let i = 0; i < k; i++) 
      sItem(this.detalleVenta[i]);
    linea();

    total(this.totalV);

    posy = posy + 3;
    doc.setFontSize(7).setFont('courier', 'normal').text(this.utils.numeroALetras(this.totalV) , 5, posy, {align:'left'});

    posy = posy + 4;

    doc.output('dataurlnewwindow');

    this.router.navigate([`./factura`]);

    this.imprimirB = false;
  }

}
