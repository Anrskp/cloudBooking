import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  company = { "tag": "" };
  email: String;
  password: String;
  receivedUserData: any;
  receivedCompanyData:any;
  //change to false
  companyFound = true;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.company.tag = params.id;
    });
  //
  //   this.authService.checkIfCompanyExist(this.company).subscribe(data => {
  //     this.receivedCompanyData = data;
  //     if (this.receivedCompanyData.success){
  //       this.companyFound = true;
  //       console.log("This is the company: " + this.receivedCompanyData.company[0].name);
  //     }
  //     else {
  //       this.companyFound = false;
  //       console.log("Company doesn't exist");
  //       this.router.navigate(['404']);
  //     }
  //   });
  }

  onLoginSubmit() {

    const user = {
      email: this.email,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
    this.receivedUserData = data;
      if (this.receivedUserData.success) {
        this.authService.storeUserData(this.receivedUserData.token, this.receivedUserData.user);
        this.router.navigate([this.company.tag + '/dashboard-admin']);
      } else {
        this.router.navigate([this.company.tag]);

        this._flashMessagesService.show("Wrong email or password", { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

}
