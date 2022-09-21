import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TProductoV } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {

  private apiUrl     : string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  guardarUnDetalle(bo:{}){
    const urlVentas = `${this.apiUrl}/detalleVentas`;
    return this.http.post<TProductoV>(urlVentas,bo,
      {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  //buscar detalle por IDVENTA
  tomarDetalle(idv:number){
    const urlVentas = `${this.apiUrl}/detalleVentas?ventaId=${idv}`;
    console.log(urlVentas);
    return this.http.get<TProductoV[]>(urlVentas);
  }

}
