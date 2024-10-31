import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-tarjeta',
  templateUrl: './eliminar-tarjeta.component.html',
  styleUrls: ['./eliminar-tarjeta.component.css']
})
export class EliminarTarjetaComponent {
  id: string | null = null;
  motivos: any[] = [];
  motivoSeleccionado: string | null = null;
  comentario: string = '';

  constructor(private route: ActivatedRoute, private adminService: AdminService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.listarMotivosEliminacion();
  }

  listarMotivosEliminacion() {
    this.adminService.listarMotivoEliminacion().subscribe({
      next: (data) => {
        this.motivos = data.motivos_eliminacion;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  eliminarTarjeta() {
    if (this.id && this.motivoSeleccionado) {
      this.adminService.eliminarTarjeta(this.id, this.motivoSeleccionado, this.comentario).subscribe({
        next: () => {
          Swal.fire({
            title: 'Tarjeta eliminada',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            window.location.href = '/admin/ver-tarjetas';
          });
        },
        error: (error) => {
          console.error(error);
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
        text: 'Selecciona un motivo de eliminación e ingresa un comentario',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
