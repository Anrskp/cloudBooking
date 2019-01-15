import { Component, OnInit } from '@angular/core';
import{AuthenticationService} from '../../services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  entityName:string;
  currentUser:string;
  type:string
  name:string;
  email:string;
  password:string;
  retypepassword:string;
  companyID:string;
  responseFromUserRegister:any;
  responseFromCreateEntity:any;


  constructor(private authService:AuthenticationService,private _flashMessagesService:FlashMessagesService,private router: Router) { }

  ngOnInit() {
    this.currentUser = this.authService.user.name;
    this.companyID = this.authService.user.companyID;
  }

  onFinalCreateClick(){
    if(this.type == "employee")
    {
        let user = {"name":this.name,"email":this.email,"password":this.password,"companyID":this.companyID};
        if(this.password === this.retypepassword){
          this.authService.registerUser(user).subscribe(response =>{
          this.responseFromUserRegister = response;
          if(this.responseFromUserRegister.success){
            this._flashMessagesService.show("Employee successfully created", { cssClass: 'alert-success', timeout: 3000 });
            this.authService.getListOfEntities("employee",  this.authService.user.companyID);
            this.name = "";
            this.email = "";
            this.password = "";
            this.retypepassword = "";
          }
          else{
          this._flashMessagesService.show(this.responseFromUserRegister.msg, { cssClass: 'alert-danger', timeout: 3000 });
          }
        });
      }
      else{
        this._flashMessagesService.show("Password must be the same", {cssClass:'alert-danger', timeout:3000});
      }

    }
    if(this.type == "entity"){
    let entity = {"entity":this.entityName};
    this.authService.createEntity(this.companyID, entity).subscribe(response =>{
      this.responseFromCreateEntity = response;
      if(this.responseFromCreateEntity.success){
        this._flashMessagesService.show("Entity successfully created", { cssClass: 'alert-success', timeout: 3000 });
        this.authService.getListOfEntities("entity",  this.authService.user.companyID);
        this.entityName = "";
      }else{
        this._flashMessagesService.show(this.responseFromCreateEntity.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    })
    }
  }

  onCreateClick(type){
    this.type = type;
  }
  onLogoutClick(){
    this.authService.logout();
    //this.router.navigate(['/login']);
  }

}
