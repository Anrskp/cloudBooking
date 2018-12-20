import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { HttpClientModule } from  '@angular/common/http';

import { FullCalendarModule } from 'ng-fullcalendar';
import { LoginComponent } from './components/login/login.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import{AuthGuard} from  './guards/auth.guard';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { Ng2CompleterModule } from "ng2-completer";








@NgModule({
  declarations: [
    AppComponent,
      DashboardComponent,
      routingComponents,
      LoginComponent,
      LoginAdminComponent,
      DashboardAdminComponent,
      PageNotFoundComponent,
      NavbarComponent,
      FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FullCalendarModule,
    FormsModule,
    AngularDateTimePickerModule,
    Ng2CompleterModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
