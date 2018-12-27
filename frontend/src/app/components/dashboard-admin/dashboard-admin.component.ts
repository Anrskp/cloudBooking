import { Component, OnInit } from '@angular/core';
import{ActivatedRoute} from "@angular/router"
import{AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  constructor(private authService: AuthenticationService, private route:ActivatedRoute) { }

  company:string;
  employeesArray = [];
  entitiesArray = [];

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.company = params.id;
      console.log(this.company);
    });
    this.authService.loadToken();

    this.authService.getListOfEntities("entity",  this.authService.user.companyID);
    this.authService.getListOfEntities("employee", this.authService.user.companyID);

    this.authService.navbarEmployees$.subscribe(
    array => this.employeesArray = array.users);

    this.authService.navbarEntities$.subscribe(
    array => this.entitiesArray = array.entities);

  }

  deleteUser(userID){
    console.log(userID);
  }

  deleteEntity(entityID){
    console.log(entityID);
  }

}
