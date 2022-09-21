import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';
import { tap } from 'rxjs/operators';
import { TPermiso } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  
  private apiUrl : string = environment.apiUrl; 
  private _permisos!: string[];
  get permisos(){
    return {...this._permisos}
  }
  
  constructor(private http: HttpClient,
              private ngxpermisos: NgxPermissionsService) { }
  
  leer_permisos(id: any){
    console.log('ID', id);
    let urlPermisos = `${this.apiUrl}/rolpermisos?id_usuario=${id}`;
    console.log(urlPermisos);
    return this.http.get<TPermiso[]>(urlPermisos)
            .pipe(
              tap(resp => {
                if (resp.length>0) {
                  this._permisos = resp[0].permisos;
                  localStorage.setItem('permisos', JSON.stringify(this._permisos));
                  console.log('TOMANDO PERMISOS',this._permisos);
                  this.ngxpermisos.loadPermissions(this._permisos)
                }
              })
            );
  }

  limpiar_permisos(){
    this._permisos = [];
    localStorage.removeItem('permisos');
    this.ngxpermisos.flushPermissions();
  }
}
