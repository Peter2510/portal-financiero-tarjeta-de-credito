import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';

interface Tarjeta {
  id: string;
  nombre_tarjeta: string;
  limite_credito: string;
  bloqueado: boolean;
  saldo: string;
  eliminada: boolean;
  tipoTarjeta: {
    tipo: string;
    moneda: {
      simbolo: string;
    };
  };
}

@Component({
  selector: 'app-ver-tarjetas',
  templateUrl: './ver-tarjetas.component.html',
  styleUrls: ['./ver-tarjetas.component.css']
})
export class VerTarjetasComponent implements OnInit{

  tarjetas: Tarjeta[] = [];

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerTarjetas();    
  }

  obtenerTarjetas() {
    this.adminService.listarTarjetas().subscribe(
      (response) => {
        console.log(response);
        this.tarjetas = response.tarjetas;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  verTarjeta(id: string) {
    console.log(`Ver tarjeta: ${id}`);
    this.router.navigate([`/admin/info-tarjeta/${id}`]);
  }

  eliminarTarjeta(id: string) {
    console.log(`Eliminar tarjeta: ${id}`);
    this.router.navigate([`/admin/eliminar-tarjeta/${id}`]);
  }

  bloquearTarjeta(id: string) {
    console.log(`Bloquear tarjeta: ${id}`);
    this.router.navigate([`/admin/bloquear-tarjeta/${id}`]);
  }

  desbloquearTarjeta(id: string) {
    this.adminService.desbloquearTarjeta(id).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: data.mensaje,
          text: 'Tarjeta desbloqueada con éxito',
        }).then(() => {
          this.obtenerTarjetas();
        });
      },
      error: (error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: error.error.mensaje,
          text: 'Error al desbloquear la tarjeta',
        });
      }
    });

  }    
}
