import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.baseUrlEnv;
  idTarjeta: string = '';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  private cookieName = 'token';

  listarTarjetas():Observable<any> {
    return this.http.get(`${this.baseUrl}/tarjeta/listar-tarjetas`);
  }

  listarTarjetaPorId(id: string):Observable<any> {
    return this.http.get(`${this.baseUrl}/tarjeta/listar-tarjeta/${id}`);
  }
  
  listarMovimientosTarjeta(id: string):Observable<any> {
    return this.http.get(`${this.baseUrl}/tarjeta/listar-movimientos/${id}`);
  }

  listarMotivoEliminacion():Observable<any> {
    return this.http.get(`${this.baseUrl}/motivo-eliminacion/listar-motivos-eliminacion`);
  }

  eliminarTarjeta(idTarjeta:any, id_motivo:any, comentario:any):Observable<any> {
    let body = {
      id_tarjeta: idTarjeta,
      id_motivo_eliminacion: id_motivo,
      comentario
    }
    return this.http.post(`${this.baseUrl}/tarjeta/eliminar-tarjeta/${this.idTarjeta}`, body);
  }

  listarMotivosBloqueo():Observable<any> {
    return this.http.get(`${this.baseUrl}/motivo-bloqueo/listar-motivos-bloqueo`);
  }

  bloquearTarjeta(id_tarjeta:any, id_motivo:any, comentario:any):Observable<any> {
    return this.http.post(`${this.baseUrl}/tarjeta/bloquear-tarjeta`, {id_tarjeta, id_motivo, comentario});
  }

  desbloquearTarjeta(id_tarjeta:any):Observable<any> {
    return this.http.post(`${this.baseUrl}/tarjeta/desbloquear-tarjeta`, {id_tarjeta});
  }

  //listarMotivosBloqueoPorTarjeta
  listarMotivosBloqueoPorTarjeta(id_tarjeta:any):Observable<any> {
    return this.http.get(`${this.baseUrl}/tarjeta/listar-motivos-bloqueo/${id_tarjeta}`);
  }

  //listarMotivosEliminacionPorTarjeta
  listarMotivosEliminacionPorTarjeta(id_tarjeta:any):Observable<any> {
    return this.http.get(`${this.baseUrl}/tarjeta/listar-eliminaciones/${id_tarjeta}`);
  }

  //listar clients
  listarClientes():Observable<any> {
    return this.http.get(`${this.baseUrl}/usuario/obtener-usuarios`);
  }

  listarConfiguraciones(): Observable<any> {
    return this.http.get(`${this.baseUrl}/configuracion/listar-configuraciones`);

  }

  buscarConfiguracionPorId(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/configuracion/buscar-configuracion/${id}`);

  }

  actualizarConfiguracion(id: string, configuracion: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/configuracion/actualizar-configuracion/${id}`, configuracion);

  }

  crearUsuarioYTarjeta(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tarjeta/crear-usuario-tarjeta`, data);
  }

  //listar entidad proveedor
  listarEntidadProveedor():Observable<any> {
    return this.http.get(`${this.baseUrl}/entidad-proveedor/listar-entidades-proveedor`);
  }

  //listar tipo tarjeta
  listarTipoTarjeta():Observable<any> {
    return this.http.get(`${this.baseUrl}/tipo-tarjeta/listar-tipos-tarjeta`);
  }



}
