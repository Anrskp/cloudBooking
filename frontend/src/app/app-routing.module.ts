import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import{AuthGuard} from  './guards/auth.guard';


const routes: Routes = [
  { path: '404', component: PageNotFoundComponent },
  { path: '',  redirectTo:'/404', pathMatch: 'full'},
  { path: ':id/dashboard', component: DashboardComponent },
  { path: ':id', component: LoginComponent },
  { path: ':id/admin', component: LoginAdminComponent },
  { path: ':id/dashboard-admin', component: DashboardAdminComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent, LoginComponent, LoginAdminComponent, DashboardAdminComponent, PageNotFoundComponent]
