import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute } from "@angular/router"
import { AuthenticationService } from '../../services/authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user = { "_id":"", "name": "","email":"","companyID":""}
  receivedData: any;
  receivedArray:any;
  receivedEntityData:any;
  responseDataFromDeleteBooking:any;
  entityList = [];
  calendarOwner = {"name":"","_id":""}
  entityListName: string;
  calendarOptions: Options;
  displayEvent: any;
  events = null;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(
    private bookingService: BookingService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.authService.listOfEntities$.subscribe(
    array => {
      this.receivedArray = array;
      if(this.receivedArray.type == "Entities"){
        this.entityList = this.receivedArray.entities;
      }
      if(this.receivedArray.type == "Employees"){
        this.entityList = this.receivedArray.users;
      }
    });

    this.authService.entityListName$.subscribe(
    listName => this.entityListName = listName);

    this.fetchUserInfo();
    //this.authService.getListOfEntities("employee",this.user.companyID);
    this.fetchUserBookings(this.user);


  }

  saveBooking(bookingDetails){
    console.log(bookingDetails);
  }

  clickButton(model: any) {
    this.displayEvent = model;
  }

  dayClick(model: any) {
    console.log(model);
  }

  eventClick(model: any) {
    model = {
      event: {
        userID: model.event.userID,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay,
        eventID: model.event._id
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;

      this.bookingService.deleteBooking(this.displayEvent.event.eventID).subscribe(data=>{
        this.responseDataFromDeleteBooking = data;
        if(this.responseDataFromDeleteBooking.success){
          this.createdBooking();
          this.flashMessagesService.show("Booking successfully deleted", { cssClass: 'alert-success', timeout: 3000 });

        }
        else{
        this.flashMessagesService.show(this.responseDataFromDeleteBooking.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
      })

    console.log("display event"+ JSON.stringify(this.displayEvent))
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


  // fetchCompanyTag() {
  //   this.route.params.subscribe(params => {
  //     this.companyTag.tag = params.id;
  //   });
  // }
  viewMyBookings(){
    this.fetchUserBookings(this.user);
  }

  fetchUserInfo() {
    this.authService.loadToken();
    this.user._id = this.authService.user.id;
    this.user.name = this.authService.user.name;
    this.user.email = this.authService.user.email;
    this.user.companyID = this.authService.user.companyID;
  }

  fetchUserBookings(user) {
    this.calendarOwner.name = user.name;
    this.calendarOwner._id = user._id;
    this.bookingService.getUserBookings(user._id).subscribe(data => {
      this.receivedData = data;
      if(this.receivedData.success){
      this.loadCalendar(this.receivedData.allBookings);

      }
      else {
        console.log(this.receivedData.msg);
        this.loadCalendar([])
      }
    });
  }

  fetchEntityBookings(entity) {
      this.calendarOwner.name = entity.name;
      this.calendarOwner._id = entity._id;
      this.bookingService.getEntityBookings(entity._id).subscribe(data =>{
      this.receivedEntityData = data;
      if(this.receivedEntityData.success){
        this.loadCalendar(this.receivedEntityData.bookings);
      }else{
        console.log(this.receivedEntityData.msg);
        this.loadCalendar([])
      }
    });
  }

  createdBooking() {
    if (this.entityListName == "Entities") {
      this.fetchEntityBookings(this.calendarOwner);
    } else if (this.entityListName == "Employees") {
      this.fetchUserBookings(this.calendarOwner);
    }
  }



  loadCalendar(events) {
  this.events = events;
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title,popover',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: events
    };
  }

  onListItemClick(entity) {
    if (this.entityListName == "Entities") {
      this.fetchEntityBookings(entity);
    } else if (this.entityListName == "Employees") {
      this.fetchUserBookings(entity);
    }
    else {
      console.log("Error")
    }

  }

}
