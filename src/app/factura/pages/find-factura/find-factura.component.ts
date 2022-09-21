import { Component, OnInit } from '@angular/core';
import { TVenta } from 'src/app/interfaces/interfaces';
import { NavegarService } from 'src/app/navegar/services/navegar.service';
import { VentasService } from '../../services/ventas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-factura',
  templateUrl: './find-factura.component.html',
  styles: [
  ]
})
export class FindFacturaComponent implements OnInit {

  ventasItems: TVenta[]=[];

  get titulo (){
    return this.navegarservice.titulo;
  }

  termino:string='';
  por:string[1]=''; //radio butin

  constructor(private navegarservice:NavegarService,
              private ventasService: VentasService,
              private router: Router) { }

  ngOnInit(): void {
    this.ultimos15();
    this.por='1';
  }

 

  buscar(termino:string){
    this.termino = termino;
    this.ventasItems=[];
    if (this.termino.length>1){
      if (this.por === '1') {  
        this.ventasService.buscarPorDocumento(this.termino)
          .subscribe(vts => this.ventasItems = vts)
      }
      else{
        this.ventasService.buscarPorRazonSocial(this.termino)
          .subscribe(vts => this.ventasItems = vts)
      }
    }
  }

  sugerencias(termino:string){
    this.termino = termino;
    this.ventasItems=[];
    if (this.por==='1') {
      if (this.termino.length>=3) {
        this.ventasService.buscarPorDocumento(this.termino)
          .subscribe(vts => this.ventasItems = vts)
      }
    }
    else{
      if (this.termino.length>=5) {
        this.ventasService.buscarPorRazonSocial(this.termino)
          .subscribe(vts => this.ventasItems = vts)
      }
    }
  }

  ultimos15(){
    this.ventasService.utimos15()
      .subscribe( vts => this.ventasItems = vts );
  }

  verdetalle(idV:number){
    console.log('ID VENTA FIND FACTURA',idV);
    this.ventasService.sidVenta(idV);
    this.router.navigate([`./factura/verdetalle`]);
  }

}
