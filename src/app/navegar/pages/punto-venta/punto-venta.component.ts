import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { TpuntoVenta } from 'src/app/interfaces/interfaces';
import { NavegarService } from '../../services/navegar.service';

@Component({
  selector: 'app-punto-venta',
  templateUrl: './punto-venta.component.html',
  styles: [
  ]
})
export class PuntoVentaComponent implements OnInit {

  pdvItems!: TpuntoVenta[];
  
  constructor(private navegarServices: NavegarService,
              private activatedroute:ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedroute.params
      .pipe(
        switchMap(({ ids }) => this.navegarServices.allPuntoVentas(ids))
      )
      .subscribe(pVentas => this.pdvItems = pVentas)
  }

  irApuntoVenta(idp:number){
    
    const ob:string[]=[
      this.pdvItems[idp].id+'',
      this.pdvItems[idp].codigoPuntoVenta+'',
      this.pdvItems[idp].nombrePuntoVenta+' (PUNTO - '+this.pdvItems[idp].codigoPuntoVenta+')'
    ];
    
    //console.log(this.pdvItems[idp]);

    this.navegarServices.limpiarP();
    this.navegarServices.limpiaeSM();
    this.navegarServices.sPuntoVenta(ob);
    this.navegarServices.sShowMenu(true);
    
    this.router.navigate([`./factura`]);
  }

}
