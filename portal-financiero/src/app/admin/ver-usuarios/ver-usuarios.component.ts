import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent {
  clientes: any[] = [];
  filtroNombre: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.adminService.listarClientes().subscribe({
      next: (data) => {
        this.clientes = data.clientes;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  filtrarClientes() {
    if (!this.filtroNombre) {
      return this.clientes;
    }
    return this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

}
