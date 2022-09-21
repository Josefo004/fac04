import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { BDPermiso } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmPermisosService implements OnInit {

  private apiUrl : string = environment.apiUrl;
  //private _bdPermisos: BDPermiso[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    let urlPermisos = `${this.apiUrl}/permisos`;
    this.http.get<BDPermiso[]>(urlPermisos)
      .pipe(
        tap( resp =>{
          
        })
      )
  }

}
