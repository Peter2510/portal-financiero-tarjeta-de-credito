import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthServicesService } from 'src/app/services/auth/auth-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  correo_electronico: string = '';
  pin: string = '';


  constructor(private authService: AuthServicesService, private router: Router, private cookie: CookieService) {

  }

  login() {
 
    if(this.correo_electronico.length === 0 || this.pin.length === 0){
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Por favor, complete todos los campos.',
      });
      return;
    }

    //send corre_electronico and pin
    this.authService.login(this.correo_electronico, this.pin).subscribe({
      next: (response: any) => {
        this.inicioSesion(response.token);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error.mensaje
        });
      }
    });

  }


  inicioSesion(token: string) {

    this.authService.saveToken(token);

    const idTipoUsuario = this.authService.getidRol();

    if (idTipoUsuario !== null) {
      const id = idTipoUsuario;

      if (id === "362a346f-ddda-4b2c-b55d-cc624a37eb5b") {
        this.router.navigate(['/admin']);
      } else if (id === "ba648de8-45f0-49b3-8edf-6d156ea12ce6") {
        this.router.navigate(['/cliente']);
      }

    }

  }

}
