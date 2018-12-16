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

  user = { "id":"", "name": "" }
  companyTag = { "tag": "" }
  companyID = { "companyID": "" }
  receivedData: {"success":"", "allBookings":""}
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

    this.fetchCompanyTag()

    this.getEmployees();

    this.fetchUserInfo();

    this.loadCalendar();

    this.fetchUserBookings(this.user.id, this.user.name);


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


  fetchCompanyTag() {
    this.route.params.subscribe(params => {
      this.companyTag.tag = params.id;
    });
  }

  fetchUserInfo() {
    let token = JSON.parse(localStorage.getItem('user'));
    this.user.id = token.id;
    this.user.name = token.email; //BACKEND MUST SEND USERNAME
  }

  fetchUserBookings(userID, userName) {
    //set calendarOwner
    this.calendarOwner = userName;
    //Get my bookings
    // if(userID == "1"){
    // this.events = [{ title: 'Ogyuns event', start: '2018-12-10T17:15:00', end: '2018-12-10T18:15:00' }]
    // }
    // if(userID == "2"){
    // this.events = [{ title: 'Anders event', start: '2018-12-10T17:15:00', end: '2018-12-10T18:15:00' }]
    // }
    // if(userID == "3"){
    // this.events = [{ title: 'Johns event', start: '2018-12-10T17:15:00', end: '2018-12-10T18:15:00' }]
    // }
    //Uncomment when merged with backend
    this.bookingService.getUserBookings(userID).subscribe(data => {
      console.log(data)
      this.receivedData.success = data['success'];
      this.receivedData.allBookings = data['allBookings'];
      
      if(this.receivedData.success){
        this.calendarOwner = userName;
        this.events = this.receivedData.allBookings;
      }
      else{
        alert("Couldn't get user bookings");
      }
    });
  }

  fetchEntityBookings(entityID, entityName) {
    this.calendarOwner = entityName;
    if(entityID == "1"){
    this.events = [{ title: 'Conference room', start: '2018-12-10T17:15:00', end: '2018-12-10T18:15:00' }]
    }
    if(entityID == "2"){
    this.events = [{ title: 'Dining roomt', start: '2018-12-10T17:15:00', end: '2018-12-10T18:15:00' }]
    }
    if(entityID == "3"){
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

  getEmployees() {
    this.entityListName = "Employees";
    this.testArray = [{ "id": "1", "name": "Ogyun" }, { "id": "2", "name": "Anders" }, { "id": "3", "name": "John" }];

    //Uncomment when merged with backend
    // this.authService.getAllCompanyEmployees(this.companyTag).subscribe(data => {
    //   if (data.success){
    //     this.entityListName = "Employees";
    //     this.testArray = data;
    //   } else {
    //     alert("Error")
    //   }
    // });
  }

  getRooms() {
    this.entityListName = "Rooms";
    this.testArray = [{ "id": "1", "name": "Conference room" }, { "id": "2", "name": "Dining room" }, { "id": "3", "name": "TV room" }];
    //Uncomment when merged with backend
    // this.bookingService.getRooms().subscribe(data => {
    //   if (data.success) {
    //     this.entityListName = "Rooms";
    //     this.testArray = data;
    //   }
    //   else {
    //   alert("Error on getting Rooms");
    //
    //   }
    // });
  }

  createBooking() {
  }

  loadCalendar() {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: []
    };
  }

  onListItemClick(ID, name) {
    if (this.entityListName == "Rooms") {
      this.fetchEntityBookings(ID, name);
    } else if (this.entityListName == "Employees") {
      this.fetchUserBookings(ID, name);
    }
    else {
      alert("Error")
    }

  }

}
