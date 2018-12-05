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

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.company = params.id;
      console.log(this.company);
    });

   this.authService.checkIfCompanyExist(this.company).subscribe(data => console.log(data));
  }


}
