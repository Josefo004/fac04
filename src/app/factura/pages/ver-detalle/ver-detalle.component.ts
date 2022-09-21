import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf' 

import { TProductoV, TpuntoVenta, Tsucursal, TVenta } from 'src/app/interfaces/interfaces';
import { DetalleVentaService } from '../../services/detalle-venta.service';
import { VentasService } from '../../services/ventas.service';
import { NavegarService } from '../../../navegar/services/navegar.service';
import { DatePipe, formatDate } from '@angular/common';
import { Utils } from '../../services/utils.service';

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
              private navegarservice: NavegarService,
              private utils: Utils) { }

  ngOnInit(): void {
    this.ventasService.buscarUnaVenta(this.idVenta)
      .subscribe(resp => {
        this.venta = resp;
        console.log(this.venta);
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

  }

 
}
