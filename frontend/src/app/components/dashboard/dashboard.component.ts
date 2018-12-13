import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute } from "@angular/router"
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user = { "userID": "" }
  company = { "tag": "" }
  calendarOptions: Options;
  displayEvent: any;
  receivedData: any;
  testArray = ["Ogyun","Anders", "Jonas", "John", "Michael"]
  calendarOwner:string;
  listEntity:string;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(
    private bookingService: BookingService,
    private authService: AuthenticationService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    //fetch the company tag
    this.route.params.subscribe(params => {
      this.company.tag = params.id;
    });

    //extract the userID from token
    let token = JSON.parse(localStorage.getItem('user'));
    this.user.userID = token.id;

    //set calendarOwner
    this.calendarOwner = "My calendar"

    //set listEntity to Employees
    this.listEntity = "Emoloyees";

    //Retrieve my bookings
      this.bookingService.getBookings(this.user).subscribe(data => {
      this.receivedData = data;
      console.log(this.receivedData)
      this.calendarOptions = {
        editable: true,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        events: [{title:'New event', start:'2018-12-10T17:15:00', end:'2018-12-10T18:15:00'}]//this.receivedData.bookings
      };
    });

  }

  clickButton(model: any) {
    this.displayEvent = model;
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params

      },
      duration: {}
    }
    this.displayEvent = model;
  }

  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }

  getEmployees(){
    this.listEntity = "Employees";
    this.testArray = ["Employee1","Employee2","Employee3","Employee4"];
  }

  getRooms(){
    this.listEntity = "Rooms";
    this.testArray = ["Room1", "Room2", "Room3", "Room4"];
  }
  createBooking(){
    alert("New booking is going to be created");
  }

  loadCalendar(entity){
    this.calendarOwner = entity;
  }

}
