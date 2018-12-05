import { Component, OnInit } from '@angular/core';
import{AuthenticationService} from '../../services/authentication.service';
import{ActivatedRoute} from "@angular/router"

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private authService: AuthenticationService, private route:ActivatedRoute) { }

  company:string;

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.company = params.id;
      console.log(this.company);
    });

   this.authService.checkIfCompanyExist(this.company).subscribe(data => console.log(data));
  }

  

}
