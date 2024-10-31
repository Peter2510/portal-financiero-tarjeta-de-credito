import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {
  usuario = {
    nombre: '',
    correo_electronico: '',
    direccion: '',
    documento_identificacion: '',
    telefono: '',
    id_rol: 'ba648de8-45f0-49b3-8edf-6d156ea12ce6',
    a2f_activo: true,
    pin: '',
    nombre_usuario: '',
    id_tipo_tarjeta: '',
    notificar_uso: true,
    limite_credito: 0,
    id_entidad_proveedor: ''
  };

  tiposTarjeta: any[] = [];
  entidadesProveedores: any[] = [];

  constructor(private usuarioTarjetaService: AdminService) {}

  ngOnInit(): void {
    this.cargarTiposTarjeta();
    this.cargarEntidadesProveedores();
  }

  cargarTiposTarjeta() {
    this.usuarioTarjetaService.listarTipoTarjeta().subscribe({
      next: (data) => {
        this.tiposTarjeta = data.tipo_tarjetas;
      },
      error: (error) => {
        console.error('Error al cargar tipos de tarjeta', error);
        this.mostrarAlerta('Error', 'Error al cargar tipos de tarjeta.', 'error');
      }
    });
  }

  cargarEntidadesProveedores() {
    this.usuarioTarjetaService.listarEntidadProveedor().subscribe({
      next: (data) => {
        this.entidadesProveedores = data.entidades_proveedor;
      },
      error: (error) => {
        console.error('Error al cargar entidades proveedoras', error);
        this.mostrarAlerta('Error', 'Error al cargar entidades proveedoras.', 'error');
      }
    });
  }

  onTipoTarjetaChange(tipoTarjetaId: string) {
    const tipoTarjeta = this.tiposTarjeta.find(tipo => tipo.id === tipoTarjetaId);
    if (tipoTarjeta) {
      this.usuario.limite_credito = tipoTarjeta.limite_credito; // Ajustar el límite de crédito
    }
  }

  crearUsuarioYTarjeta() {
    if (!this.validarCampos()) {
      this.mostrarAlerta('Advertencia', 'Por favor, completa todos los campos requeridos.', 'warning');
      return;
    }

    this.usuarioTarjetaService.crearUsuarioYTarjeta(this.usuario).subscribe({
      next: (data) => {
        this.mostrarAlerta('Éxito', data.mensaje, 'success');
        this.limpiarFormulario();
      },
      error: (error) => {
        this.mostrarAlerta('Error', error.error.mensaje || 'Error al crear el usuario y tarjeta.', 'error');
      }
    });
  }

  validarCampos(): boolean {
    return !!(this.usuario.nombre && this.usuario.correo_electronico && this.usuario.direccion &&
              this.usuario.documento_identificacion && this.usuario.telefono &&
              this.usuario.id_tipo_tarjeta && this.usuario.id_entidad_proveedor &&
              this.usuario.pin && this.usuario.nombre_usuario);
  }

  limpiarFormulario() {
    this.usuario = {
      nombre: '',
      correo_electronico: '',
      direccion: '',
      documento_identificacion: '',
      telefono: '',
      id_rol: 'ba648de8-45f0-49b3-8edf-6d156ea12ce6',
      a2f_activo: true,
      pin: '',
      nombre_usuario: '',
      id_tipo_tarjeta: '',
      notificar_uso: true,
      limite_credito: 0,
      id_entidad_proveedor: ''
    };
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
