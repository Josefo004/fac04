export interface TLogin {
  usuario : string;
  passwd  : string;
  sucursal: number;
}

export interface TUsuario {
  usuario: string;
  password:  string;
  nombre:  string;
  nivel:   string;
}

export interface TUsuario2 {
  id:       number;
  usuario:  string;
  password: string;
  nombre:   string;
  nivel:    number;
}
export interface TPermiso {
  id:         number;
  id_usuario: number;
  permisos:   string[];
}
export interface BDPermiso {
  id:      number;
  permiso: string;
}

export interface Tsucursal {
  id:          number;
  nroSucursal: number;
  nombre:      string;
  direccion:   string;
  telefono:    string;
  created_at:  Date;
  updated_at:  Date;
}

export interface TpuntoVenta {
  id:               number;
  codigoPuntoVenta: number;
  nombrePuntoVenta: string;
  tipoPuntoVenta:   string;
  sucursalId:       number;
}

export interface TVenta {
  id:           number;
  razonSocial:  string;
  fechHora:     Date;
  monto:        number;
  nroDocumento: string;
  estado:       boolean;
  puntoVentaId: number;
}

export interface TRazonSocial {
  id?:          number;
  razonSocial:  string;
  nroDocumento: string;
  tipoDoc:      string;
}

export interface TProducto {
  id:             number;
  producto:       string;
  unidad:         string;
  precioUnitario: number;
  sucursalId:     number;
  puntoVentaId:   number;
}

export interface TProductoV {
  id?:            number;
  producto:       string;
  unidad:         string;
  precioUnitario: number;
  cantidad:       number;
  sucursalId:     number;
  puntoVentaId:   number;
  ventaId:        number;
}


