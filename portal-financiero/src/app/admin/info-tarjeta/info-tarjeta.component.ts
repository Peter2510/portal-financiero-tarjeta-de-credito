import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Importa autoTable directamente

interface Tarjeta {
  id: string;
  id_tipo_tarjeta: string;
  fecha_creacion: string;
  notificar_uso: boolean;
  limite_credito: string;
  nombre_tarjeta: string;
  numero_tarjeta: string;
  cvv: string;
  eliminada: boolean;
  cantidad_rechazos: number;
  bloqueado: boolean;
  saldo: string;
  tipoTarjeta: {
    tipo: string;
    moneda: {
      simbolo: string;
    };
  };
}

interface Movimiento {
  id: string;
  fecha: string;
  descripcion: string;
  debito: string;
  credito: string;
  saldo_disponible: string;
}

interface Bloqueo {
  id: string;
  id_tarjeta: string;
  comentario: string;
  fecha_bloqueo: string;
  fecha_desbloqueo: string | null;
  motivoBloqueo: {
    id: string;
    motivo: string;
  };
}

interface Eliminacion {
  id: string;
  id_tarjeta: string;
  comentario: string;
  createdAt: string;
  id_motivo: string;
  motivoEliminacion: {
    id: string;
    motivo: string;
  };
}

@Component({
  selector: 'app-info-tarjeta',
  templateUrl: './info-tarjeta.component.html',
  styleUrls: ['./info-tarjeta.component.css']
})
export class InfoTarjetaComponent implements OnInit {
  tarjeta: Tarjeta | null = null;
  bloqueos: Bloqueo[] = [];
  eliminaciones: Eliminacion[] = []; 
  movimientos: Movimiento[] = [];

  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerTarjeta();
    this.listarMovimientos();
    this.listarBloqueos();
    this.listarEliminaciones();
  }

  obtenerTarjeta() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.adminService.listarTarjetaPorId(id).subscribe({
        next: (data) => {
          this.tarjeta = data.tarjeta; 
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  listarMovimientos() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.adminService.listarMovimientosTarjeta(id).subscribe({
        next: (data) => {
          this.movimientos = data.movimientos;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  descargarPDF() {
    const doc = new jsPDF();

    // Estilo del encabezado
    doc.setFontSize(18);
    doc.text('Movimientos de Tarjeta', 14, 20);

    // Agregar detalles de la tarjeta
    if (this.tarjeta) {
      doc.setFontSize(12);
      doc.text(`Nombre: ${this.tarjeta.nombre_tarjeta}`, 14, 30);
      doc.text(`Límite de crédito: Q.${this.tarjeta.limite_credito}`, 14, 40);
      doc.text(`Saldo: Q.${this.tarjeta.saldo}`, 14, 50);
      doc.text(`Estado: ${this.tarjeta.bloqueado ? 'Bloqueada' : 'Activa'}`, 14, 60);
      doc.text(`Fecha de creación: ${this.tarjeta.fecha_creacion}`, 14, 70);
    }

    // Agregar encabezados de la tabla
    const headers = ['Fecha', 'Descripción', 'Débito', 'Crédito', 'Saldo disponible'];
    const data = this.movimientos.map(m => [
      m.fecha,
      m.descripcion,
      m.debito,
      m.credito,
      m.saldo_disponible
    ]);

    // Agregar la tabla
    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 80,
      theme: 'grid'
    });

    // Guardar el archivo PDF
    doc.save('movimientos_tarjeta.pdf');
  }

  listarBloqueos() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.adminService.listarMotivosBloqueoPorTarjeta(id).subscribe({
        next: (data) => {
          this.bloqueos = data.bloqueos;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  listarEliminaciones() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.adminService.listarMotivosEliminacionPorTarjeta(id).subscribe({
        next: (data) => {
          this.eliminaciones = data.eliminaciones;
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }


}
