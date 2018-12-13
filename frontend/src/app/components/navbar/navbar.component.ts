import { Component, OnInit,Input, EventEmitter, Output} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from "@angular/router"


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService:AuthenticationService,
    private router: Router,
    private route: ActivatedRoute )
    { }

  @Output() getEmployeesEvent = new EventEmitter();
  @Output() getRoomsEvent = new EventEmitter();
  @Output() createBookingEvent = new EventEmitter();
  @Input() company:Object;

  // private testArray:Array;
  array = ["Hello from navbar", "welcome to navbar component"]

  // getArray(){
  //   return this.testArray;
  // }
  //
  // @Input()
  // setArray(value:Array){
  //   this.testArray = value;
  // }


  ngOnInit() {
    console.log(this.company);
  }


  onLogoutClick(){

    this.authService.logout();
    console.log(this.company);

  }

    callDashboardGetEmployees(){
      this.getEmployeesEvent.emit();
    }

    callDashboardGetRooms(){
        this.getRoomsEvent.emit();
    }

    callDashboardCreateBooking(){
      this.createBookingEvent.emit();
    }

}
