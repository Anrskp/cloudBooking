import { Component, OnInit } from '@angular/core';
import{ActivatedRoute} from "@angular/router"
import{AuthenticationService} from '../../services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private route:ActivatedRoute,
    private _flashMessagesService: FlashMessagesService) { }

  company:string;
  employeesArray = [];
  entitiesArray = [];
  deleteEntityReceivedData:any;

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

    this._flashMessagesService.show("Not implemented", { cssClass: 'alert-danger', timeout: 3000 });
  }

  deleteEntity(entityID){
      let companyID = this.authService.user.companyID;
      this.authService.deleteEntity(companyID, entityID).subscribe(data => {
      this.deleteEntityReceivedData = data;
      if(this.deleteEntityReceivedData.success){
        this._flashMessagesService.show("Entity successfully deleted", { cssClass: 'alert-success', timeout: 3000 });
        this.authService.getListOfEntities("entity",  this.authService.user.companyID);
      }
      else {
        this._flashMessagesService.show(this.deleteEntityReceivedData.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

}
