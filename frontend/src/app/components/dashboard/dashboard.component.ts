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

  user = { "id":"", "name": "","email":"","companyID":""}
  receivedData: any;
  testArray = [];
  testEvent = [{ title: 'New event', start: '2018-12-10T17:15:00', end: '2018-12-10T18:15:00' }, { title: 'Second event', start: '2018-12-14T17:15:00', end: '2018-12-14T23:15:00' }];
  calendarOwner: string;
  entityListName: string;

  calendarOptions: Options;
  displayEvent: any;
  events = null;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(
    private bookingService: BookingService,
    private authService: AuthenticationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.authService.listOfEntities$.subscribe(
    array => this.testArray = array.users);

    this.authService.entityListName$.subscribe(
    listName => this.entityListName = listName);

    this.fetchUserInfo();
    this.authService.getListOfEntities("employee",this.user.companyID);
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


  // fetchCompanyTag() {
  //   this.route.params.subscribe(params => {
  //     this.companyTag.tag = params.id;
  //   });
  // }

  fetchUserInfo() {
    this.authService.loadToken();
    this.user.id = this.authService.user.id;
    this.user.name = this.authService.user.name;
    this.user.email = this.authService.user.email;
    this.user.companyID = this.authService.user.companyID;
  }

  fetchUserBookings(user) {
    this.calendarOwner = user.name;

    this.bookingService.getUserBookings(user.id).subscribe(data => {
      this.receivedData = data;
      if(this.receivedData.success){
      this.loadCalendar(this.receivedData.allBookings);
      }
      else {
        console.log(this.receivedData.msg);
      }
    });
  }

  fetchEntityBookings(entity) {
    this.calendarOwner = entity.name;
    if(entity.id == "1"){
    this.events = [{ title: 'Conference room', start: '2018-12-10T17:15:00', end: '2018-12-10T18:15:00' }]
    }
    if(entity.id == "2"){
    this.events = [{ title: 'Dining roomt', start: '2018-12-10T17:15:00', end: '2018-12-10T18:15:00' }]
    }
    if(entity.id == "3"){
    this.events = [{ title: 'Tv room', start: '2018-12-10T17:15:00', end: '2018-12-10T18:15:00' }]
    }
    //Uncomment when merged with backend
    //   this.bookingService.getEntityBookings(entityID).subscribe(data =>{
    //   if(data.success){
    //       this.calendarOwner = entityName;
    //       this.events = data;
    //   }else{
    //     alert("Couldn't get entity bookings")
    //   }
    // });
  }

  createBooking() {
  }

  loadCalendar(events) {
  this.events = events;
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
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
