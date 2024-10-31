import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardAdminComponent } from './admin/vista-principal/dashboard-admin/dashboard-admin.component';
import { DashboardClienteComponent } from './clientes/vista-principal/dashboard-cliente/dashboard-cliente.component';
import { LoginComponent } from './auth/login/login.component';
import { VerTarjetasComponent } from './admin/ver-tarjetas/ver-tarjetas.component';
import { CrearTarjetaComponent } from './admin/crear-tarjeta/crear-tarjeta.component';
import { ReportesComponent } from './admin/reportes/reportes.component';
import { InfoTarjetaComponent } from './admin/info-tarjeta/info-tarjeta.component';
import { EliminarTarjetaComponent } from './admin/eliminar-tarjeta/eliminar-tarjeta.component';
import { BloquearTarjetaComponent } from './admin/bloquear-tarjeta/bloquear-tarjeta.component';
import { ConfiguracionComponent } from './admin/configuracion/configuracion.component';
import { VerUsuariosComponent } from './admin/ver-usuarios/ver-usuarios.component';


const routes: Routes = [
  { path: 'login', component: AppComponent }, 
  { path: 'admin', component:  DashboardAdminComponent},
  { path: 'admin/ver-tarjetas', component:  VerTarjetasComponent},
  { path: 'admin/crear-tarjeta', component:  CrearTarjetaComponent},
  { path: 'admin/ver-usuarios', component:  VerUsuariosComponent},
  { path: 'admin/info-tarjeta/:id', component: InfoTarjetaComponent},
  { path: 'admin/reportes', component:  ReportesComponent},
  { path: 'admin/eliminar-tarjeta/:id', component:  EliminarTarjetaComponent},
  { path: 'admin/bloquear-tarjeta/:id', component:  BloquearTarjetaComponent},
  { path: 'admin/configuracion', component:  ConfiguracionComponent},


  { path: 'cliente', component: DashboardClienteComponent },
  { path: '', component: LoginComponent }, 
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
