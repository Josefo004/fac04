import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TLogin, Tsucursal } from 'src/app/interfaces/interfaces';
import { NavegarService } from '../../../navegar/services/navegar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  sucItems!: Tsucursal[];
  hayError : boolean = false;
  unaSucursal!: Tsucursal;

  loginForm = this.fb.group({
    email: ['juan.carrasco', [Validators.required]],
    password: ['111111',[Validators.required]],
    sucursal: [0],
    remember:[false]
  });

  constructor(private fb: UntypedFormBuilder,
              private authservice: AuthService,
              private router: Router,
              private navegarService: NavegarService) { }

  ngOnInit(): void {
    this.navegarService.allSucursales()
      .subscribe( sucrs => this.sucItems = sucrs); 
  }

  login(){
    this.hayError = false;
    const usulogin : TLogin = {
      usuario : this.loginForm.value.email,
      passwd : this.loginForm.value.password,
      sucursal : this.loginForm.value.sucursal
    };
    console.log(usulogin);
    this.authservice.login(usulogin)
      .subscribe(resp => {
        console.log(resp);
        if (usulogin.sucursal>0) {
          this.navegarService.unaSucursal(usulogin.sucursal)
            .subscribe(resp => {
              if (resp) {
                const ob:string[]=[
                resp.id+'',
                resp.nroSucursal+'',
                resp.nombre
                ];
                this.navegarService.limpiarS();
                this.navegarService.sSucursal(ob);
                this.router.navigate([`./navegar/puntoventa/${resp.id}`]);
              }
            });         
        }
        this.router.navigate(['./navegar']);
      },(error) => {
        this.hayError = true;
        console.error(error);
      });
  }

  login2(){
    const body = {
      grant_type:"password",
      client_id:"2",
      client_secret:"1Fcw2KSAfeZ9gvebD2RkhuheXZXRlDphhgfuE7pH",
      username:"correo@correo.com",
      password:"12345678"
    }
    this.authservice.login2(body)
      .subscribe(
        resp=>console.log(resp),
      e=>console.log('ERROR',e.error_description)
      );

  }

  julio(){
    this.navegarService.julito()
      .subscribe(resp => console.log(resp));
  }

}
