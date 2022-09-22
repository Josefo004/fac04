import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NgxPermissionsModule.forRoot(),
    BrowserAnimationsModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [NgxPermissionsModule]
})
export class AppModule { }
