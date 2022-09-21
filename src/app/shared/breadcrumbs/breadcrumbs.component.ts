import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NavegarService } from 'src/app/navegar/services/navegar.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent {

  get titulo (){
    return this.navegarservice.titulo;
  }
    
  constructor(private navegarservice:NavegarService) {
    
  }

 

}
