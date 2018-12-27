import { Component, OnInit } from '@angular/core';
import{AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  currentUser:string;
  type:string
  name:string;
  email:string;
  password:string;
  companyID:string;
  responseFromUserRegister:any;


  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this.authService.user.name;
    this.companyID = this.authService.user.companyID;
  }

  onFinalCreateClick(){
    if(this.type == "employee")
    {
      let user = {"name":this.name,"email":this.email,"password":this.password,"companyID":this.companyID};
      this.authService.registerUser(user).subscribe(response =>{
      this.responseFromUserRegister = response;
      if(this.responseFromUserRegister.success){
        console.log(this.responseFromUserRegister.msg);
      }
      else{
        console.log(this.responseFromUserRegister.msg);
      }
    });
    }
    if(this.type == "entity"){
      //route for creating entity
      console.log("create entity clicked: " + this.name);
    }
  }

  onCreateClick(type){
    this.type = type;
  }
  onLogoutClick(){
    this.authService.logout();
  }

}
