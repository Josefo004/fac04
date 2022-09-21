import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavegarService } from 'src/app/navegar/services/navegar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  get sucursalN(){
    return this.navegarservice.sucursalN;
  }

  get puntoVentaN(){
    return this.navegarservice.puntoVentaN;
  }

  constructor(private navegarservice:NavegarService,
              private router: Router) { }

  ngOnInit(): void {
  }

  irAPuntosVenta(ids:string){
    //console.log(`./navegar/puntoventa/${ids}`);
    this.navegarservice.limpiarP();
    this.router.navigate([`./navegar/puntoventa/${ids}`]);
  }

}
