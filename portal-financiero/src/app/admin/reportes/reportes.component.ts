import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  public barChartOptions: any = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [{ data: [], label: 'Eliminaciones' }];

  constructor() {}

  ngOnInit(): void {
    // Aquí puedes hacer la llamada a tu API para obtener los datos
    this.obtenerDatosReporte();
  }

  obtenerDatosReporte() {
    // Simula una llamada a la API que obtiene datos de eliminaciones
    // Reemplaza esto con tu llamada HTTP real
    const datosEjemplo = [
      { tarjeta: 'Tarjeta A', cantidad: 5 },
      { tarjeta: 'Tarjeta B', cantidad: 3 },
      { tarjeta: 'Tarjeta C', cantidad: 8 },
    ];

    this.barChartLabels = datosEjemplo.map(d => d.tarjeta);
    this.barChartData[0].data = datosEjemplo.map(d => d.cantidad);
  }
}
