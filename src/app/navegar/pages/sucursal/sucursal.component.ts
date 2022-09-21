import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../services/navegar.service';
import { tap } from 'rxjs';
import { Tsucursal } from 'src/app/interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html'
})
export class SucursalComponent implements OnInit {

  sucItems!: Tsucursal[];

  constructor(private navegarServices: NavegarService,
              private router: Router) { }

  ngOnInit(): void {
    this.navegarServices.allSucursales()
      .subscribe( sucrs => this.sucItems = sucrs); 
  }

  irAsucursal(ids:number){
    //console.log('INDEX',ids);
    
    const ob:string[]=[
      this.sucItems[ids].id+'',
      this.sucItems[ids].nroSucursal+'',
      this.sucItems[ids].nombre
    ];

    //console.log(ob);
  
    this.navegarServices.limpiarS();
    this.navegarServices.sSucursal(ob);
    this.router.navigate([`./navegar/puntoventa/${this.sucItems[ids].id}`]);
  }

}
