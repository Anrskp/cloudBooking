import { Component, OnInit } from '@angular/core';
import{ActivatedRoute} from "@angular/router"
import{AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService, private route:ActivatedRoute,   private router: Router) { }

  company:string;
  email: String;
  password: String;
  receivedData:any;



  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.company = params.id;
      console.log(this.company);
    });

   this.authService.checkIfCompanyExist(this.company).subscribe(data => console.log(data));
  }


  onLoginSubmit(){

    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data =>{
    this.receivedData = data;
          if(this.receivedData.success){
            this.authService.storeUserData(this.receivedData.token, this.receivedData.user);
              this.router.navigate([this.company +'/dashboard']);
            } else {
               this.router.navigate([this.company + '/login']);
              }
            });
    }

}
