import { Component, OnInit,ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import {BookingService} from '../../services/booking.service';
import{ActivatedRoute} from "@angular/router"
import{AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

user = {"userID":""}
calendarOptions: Options;
displayEvent: any;
receivedData:any;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private bookingService:BookingService,private authService: AuthenticationService, private route:ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params =>{
      this.user.userID = params.id;
      console.log(this.user);
    });

   this.authService.checkIfCompanyExist(this.userID).subscribe(data => {
    this.receivedData = data;


     // if (this.receivedData){
       this.bookingService.getBookings(this.user).subscribe(data =>
     {
           this.calendarOptions = {
             editable: true,
             eventLimit: false,
             header: {
               left: 'prev,next today',
               center: 'title',
               right: 'month,agendaWeek,agendaDay,listMonth'
             },
             events: data.bookings
           };
       });
     // }
     // else{
     //   console.log("Error");
     // }
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



}
