import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bloquear-tarjeta',
  templateUrl: './bloquear-tarjeta.component.html',
  styleUrls: ['./bloquear-tarjeta.component.css']
})
export class BloquearTarjetaComponent {
  id: string | null = null;
  motivos: any[] = [];
  motivoSeleccionado: string | null = null;
  comentario: string = '';

  constructor(private route: ActivatedRoute, private adminService: AdminService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.listarMotivosBloqueo();
  }

  listarMotivosBloqueo() {
    this.adminService.listarMotivosBloqueo().subscribe({
      next: (data) => {
        this.motivos = data.motivos_bloqueo;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  bloquearTarjeta() {
    if (this.id && this.motivoSeleccionado) {
      this.adminService.bloquearTarjeta(this.id, this.motivoSeleccionado, this.comentario).subscribe({
        next: (data) => {
          Swal.fire({
            title: data.mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            window.location.href = '/admin/ver-tarjetas';
          });
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error.error.mensaje,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Selecciona un motivo e ingresa un comentario',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
