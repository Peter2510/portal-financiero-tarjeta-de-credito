import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2'; // Importar SweetAlert2

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {
  configuraciones: any[] = [];
  nuevaConfiguracion: any = { id: '', tipo: '', valor: '' };
  modalVisible: boolean = false;

  constructor(private configuracionService: AdminService) {}

  ngOnInit(): void {
    this.listarConfiguraciones();
  }

  listarConfiguraciones() {
    this.configuracionService.listarConfiguraciones().subscribe({
      next: (data) => {
        if (data.ok) {
          this.configuraciones = data.configuraciones;
        } else {
          this.mostrarAlerta('Error', 'Error al cargar configuraciones.', 'error');
        }
      },
      error: (error) => {
        console.error(error);
        this.mostrarAlerta('Error', 'Error al cargar configuraciones.', 'error');
      }
    });
  }

  buscarConfiguracionPorId(id: string) {
    this.configuracionService.buscarConfiguracionPorId(id).subscribe({
      next: (data) => {
        this.nuevaConfiguracion = data.configuracion;
        this.modalVisible = true; // Mostrar el modal
      },
      error: (error) => {
        this.mostrarAlerta('Error', error.error.mensaje, 'error');
      }
    });
  }

  actualizarConfiguracion() {
    this.configuracionService.actualizarConfiguracion(this.nuevaConfiguracion.id, this.nuevaConfiguracion).subscribe({
      next: (data) => {
        this.mostrarAlerta('Éxito', data.mensaje, 'success');
        this.nuevaConfiguracion = { id: '', tipo: '', valor: '' };
        this.listarConfiguraciones(); 
        this.modalVisible = false; // Ocultar el modal
      },
      error: (error) => {
        this.mostrarAlerta('Error', error.error.mensaje, 'error');
      }
    });
  }

  cerrarModal() {
    this.modalVisible = false; // Ocultar el modal
  }

  mostrarAlerta(titulo: string, mensaje: string, icono: any) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: icono,
      confirmButtonText: 'Aceptar'
    });
  }
}
