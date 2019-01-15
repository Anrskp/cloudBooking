import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { AuthenticationService } from '../../services/authentication.service';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router,private _flashMessagesService: FlashMessagesService, private bookingService: BookingService) { }

  company = { "tag": "" };
  email: String;
  password: String;
  receivedUserData: any;
  receivedCompanyData:any;
  companyFound = true;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.company.tag = params.id;
    });

    // this.authService.checkIfCompanyExist(this.company).subscribe(data => {
    //   this.receivedCompanyData = data;
    //   if (this.receivedCompanyData.success && this.receivedCompanyData.company.length > 0){
    //     this.companyFound = true;
    //     console.log("This is the company: " + this.receivedCompanyData.company[0].name);
    //   }
    //   else {
    //     this.companyFound = false;
    //     console.log("Company doesn't exist");
    //     this.router.navigate(['404']);
    //   }
    // });
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
        this.authService.loadToken();
        this.bookingService.loadToken();
        this.router.navigate([this.company.tag + '/dashboard']);
      } else {
        this.router.navigate([this.company.tag]);

        this._flashMessagesService.show("Wrong email or password", { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

}
