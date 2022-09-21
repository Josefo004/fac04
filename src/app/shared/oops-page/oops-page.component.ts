import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavegarService } from 'src/app/navegar/services/navegar.service';

@Component({
  selector: 'app-oops-page',
  templateUrl: './oops-page.component.html',
  styles: [
  ]
})
export class OopsPageComponent {

  get titulo (){
    return this.navegarservice.titulo;
  }

  constructor(private navegarservice:NavegarService,
              private router:Router) { }

  mainNavegar(){
    this.router.navigate(['/navegar']);
    this.navegarservice.limpiarS();
    this.navegarservice.limpiarP();
  }

}
