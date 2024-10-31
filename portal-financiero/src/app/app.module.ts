import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardClienteComponent } from './clientes/vista-principal/dashboard-cliente/dashboard-cliente.component';
import { DashboardAdminComponent } from './admin/vista-principal/dashboard-admin/dashboard-admin.component';
import { LoginComponent } from './auth/login/login.component';
import { CrearTarjetaComponent } from './admin/crear-tarjeta/crear-tarjeta.component';
import { VerTarjetasComponent } from './admin/ver-tarjetas/ver-tarjetas.component';
import { ReportesComponent } from './admin/reportes/reportes.component';
import { InfoTarjetaComponent } from './admin/info-tarjeta/info-tarjeta.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HeaderComponent } from './admin/header/header.component';
import { BloquearTarjetaComponent } from './admin/bloquear-tarjeta/bloquear-tarjeta.component';
import { EliminarTarjetaComponent } from './admin/eliminar-tarjeta/eliminar-tarjeta.component';
import { ConfiguracionComponent } from './admin/configuracion/configuracion.component';
import { VerUsuariosComponent } from './admin/ver-usuarios/ver-usuarios.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardClienteComponent,
    DashboardAdminComponent,
    LoginComponent,
    CrearTarjetaComponent,
    VerTarjetasComponent,
    ReportesComponent,
    InfoTarjetaComponent,
    PerfilComponent,
    HeaderComponent,
    BloquearTarjetaComponent,
    EliminarTarjetaComponent,
    ConfiguracionComponent,
    VerUsuariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
