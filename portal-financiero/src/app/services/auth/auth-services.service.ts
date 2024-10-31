import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  private baseUrl = environment.baseUrlEnv;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  private cookieName = 'token';

  login(correo_electronico: string, pin: string) {
    const body = { correo_electronico, pin };
    console.log(body);

    return this.http.post(`${this.baseUrl}/auth/login`, body);
  }

  generarCodigo(correoElectronico: string) {
    const body = { correoElectronico };
    return this.http.post(`${this.baseUrl}/auth/enable-2fa`, body);
  }

  cambioCredenciales(
    contrasenia: string,
    mismaContrasenia: string,
    correoElectronico: string
  ) {
    const body = { contrasenia, mismaContrasenia, correoElectronico };

    return this.http.post(`${this.baseUrl}/auth/cambioCredenciales`, body);
  }

  verificar(correoElectronico: string, token: string) {
    const body = { correoElectronico, token };
    console.log(body);
    return this.http.post(`${this.baseUrl}/auth/verify-2fa`, body);
  }

  //guardo Token en cookie
  saveToken(token: string): void {
    this.cookieService.set(this.cookieName, token, undefined, '/');
  }

  //obtengo todo el token jwt
  public getToken(): string | null {
    return this.cookieService.get(this.cookieName);
  }

  //decodifico el token y devuelvo el objeto
  private decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  //cerrar sesion -> eliminar la cookie
  logout(): void {
    this.cookieService.delete(this.cookieName);
    this.router.navigate(['/']);
  }

  getIdUsuario(): number | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.idUsuario) {
      return decodedToken.idUsuario;
    }
    return null;
  }

  public getidRol(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.idRol) {
      return decodedToken.idRol;
    }
    return null;
  }

  getIATToken(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.iat) {
      return decodedToken.iat;
    }
    return null;
  }

  getExpToken(): string | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.exp) {
      return decodedToken.exp;
    }
    return null;
  }


}
