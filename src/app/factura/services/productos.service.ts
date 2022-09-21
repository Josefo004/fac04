import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TProducto } from 'src/app/interfaces/interfaces';
import { NavegarService } from 'src/app/navegar/services/navegar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl     : string = environment.apiUrl;

  get puntoVenta(){
    return this.navegarService.puntoVentaN;
  }

  constructor(private http: HttpClient,
              private navegarService: NavegarService) { }

  productosPorPVenta(){
    const urlProductos = `${this.apiUrl}/productos?&puntoVentaId=${this.puntoVenta[0]}`;
    return this.http.get<TProducto[]>(urlProductos);
  }
}
