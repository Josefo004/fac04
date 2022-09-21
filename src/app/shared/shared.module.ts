import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { InputComponent } from './input/input.component';
import { OopsPageComponent } from './oops-page/oops-page.component';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    ErrorPageComponent,
    InputComponent,
    OopsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxPermissionsModule
  ],
  exports:[
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    InputComponent,
    ErrorPageComponent,
    OopsPageComponent
  ]
})
export class SharedModule { }
