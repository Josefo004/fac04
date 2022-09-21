import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:{}[]=[
    {
    titulo:'Factura',
    icono:'nav-icon fas fa-copy',
    permisos: ['LOG'],
    submenu:[
      {
        permisos: ['canDoFactura'],
        titulo:' Nueva Factura', url:'/factura/factura', icono:'fas fa-calculator'},
      {
        permisos: ['canFindFactura'],
        titulo:' Busqueda Factura', url:'/factura/busquedaA', icono:'fa fa-search-plus'}
    ]
    },
    {
      titulo:'Configuración',
      icono:'nav-icon fas fa-table',
      permisos: ['ADMIN'],
      submenu:[
        {permisos: ['canSucursal'], titulo:'Sucursales', url:'/admfactura/sucursal', icono:'far fa-circle nav-icon'},
        {permisos: ['canpVenta'], titulo:'Puntos de Venta', url:'/admfactura/puntoventa', icono:'far fa-circle nav-icon'},
        {permisos: ['canProductos'], titulo:'Productos', url:'/admfactura/producto', icono:'far fa-circle nav-icon'},
        {permisos: ['canUnidad'], titulo:'Unidad de Medida', url:'/admfactura/unidadmendida', icono:'far fa-circle nav-icon'}
      ]
    },
    {
      titulo:'Adm. Usuarios',
      icono:'nav-icon fas fa-table',
      permisos: ['ADMIN'],
      submenu:[
        {permisos: ['canUsuario'], titulo:'Usuarios', url:'/admusuario/usuario', icono:'far fa-circle nav-icon'}
      ]
    }
  ]

  constructor() { }
}
