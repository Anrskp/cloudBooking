import { Component, OnInit,Input, EventEmitter, Output} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {BookingService} from '../../services/booking.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from "@angular/router"
import { CompleterService, CompleterData,CompleterItem } from 'ng2-completer';
import { FormControl } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService:AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private bookingService:BookingService,
    private completerService: CompleterService,
    private _flashMessagesService: FlashMessagesService){}

  @Output() loadCalendarEvent = new EventEmitter();
  @Output() saveBookingEvent = new EventEmitter();
  @Output() viewMyBookingsEvent = new EventEmitter();
  @Input() company:Object;

  protected searchStrEmployees: string;
  protected dataServiceEmployees:CompleterData;
//protected searchDataEmployees = [{ "id": "5c07bbe05bf0360f9407ee27", "name": "Ogyun" }, { "id": "5c1a192f747d2716b02c2ddd", "name": "Anders" }]

  protected searchStrEntitites: string;
  protected dataServiceEntities:CompleterData;
//  protected searchDataEntities = [{ "id": "1", "name": "Dining room" }, { "id": "2", "name": "Conference room" }]

  startDate: Date = new Date();
  startDateSettings = {
     bigBanner: true,
     timePicker: true,
     format: 'dd-MM-yyyy HH:mm:ss',
     defaultOpen: false
   }

   endDate: Date = new Date();
   endDateSettings = {
      bigBanner: true,
      timePicker: true,
      format: 'dd-MM-yyyy HH:mm:ss',
      defaultOpen: false
    }


  peopleInvited = [];
  entity = {"id":"", "name":"", "startDate":"", "endDate":"","available":"","selected":false};


  username:string;
  Title: string;
  text:string;
  checkbox = false;
  sendNotification:boolean;
  dataUserAvailability:any;
  dataEntityAvailability:any;
  createBookingResponse:any;

  ngOnInit() {

    this.authService.navbarEntities$.subscribe(
    array => {
      this.dataServiceEntities = this.completerService.local(array.entities, 'name','name');
    });

    this.authService.navbarEmployees$.subscribe(
    array => {
      this.dataServiceEmployees = this.completerService.local(array.users, 'name','name');
    });

    this.authService.getListOfEntities("entity",  this.authService.user.companyID);
    this.authService.getListOfEntities("employee", this.authService.user.companyID);


    this.username = this.authService.user.name;

    //add the author of the booking
    this.peopleInvited.push(this.authService.user);
    console.log(this.authService.user);

  }

  onStartDateSelect(event){
    this.startDate = event;
  }

  onEndDateSelect(event){
    this.endDate = event;
  }

  onItemSelectEmployee(selected:CompleterItem){
    if(selected){
    let startDate = this.startDate.toISOString();
    startDate = startDate.slice(0, -5);
    let endDate = this.endDate.toISOString();
    endDate = endDate.slice(0, -5);
    let user = {"id":selected.originalObject._id, "name":selected.originalObject.name, "startDate":startDate,"endDate":endDate, "available":""}

      // if(this.checkUserAvailability(user)){
      //   user.available = "true";
      //
      // }else{
      //   user.available = "false";
      // }
      this.peopleInvited.push(user)
      this.searchStrEmployees = "";
    }

  }

  onItemSelectEntity(selected:CompleterItem){
    if(selected){
      let startDate = this.startDate.toISOString();
      startDate = startDate.slice(0, -5);
      let endDate = this.endDate.toISOString();
      endDate = endDate.slice(0, -5);
      let entity = {"id":selected.originalObject._id, "name":selected.originalObject.name, "startDate":startDate,"endDate":endDate, "available":""}
      // if(this.checkEntityAvailability(entity)){
      //   entity.available = "true";
      //
      // }else{
      //   entity.available = "false";
      // }
      this.entity.id = entity.id;
      this.entity.startDate = entity.startDate;
      this.entity.endDate = entity.endDate;
      this.entity.name = entity.name;
      this.entity.available = entity.available;
      this.entity.selected = true;

      this.searchStrEntitites = "";
    }

  }


  onLogoutClick(){
    this.authService.logout();
  }

    sendArrayToAuthService(type){
      this.authService.getListOfEntities(type, this.authService.user.companyID);
    }

    onMyBookingsClick(){
      this.viewMyBookingsEvent.emit();
    }

    onCreateBookingClick(){

      let checkboxValue = $('#checkbox').is(':checked');
      let message = $('#message').val();
      // let people = [];
      // for(let i=0; i < this.peopleInvited.length; i++){
      //   people.push(this.peopleInvited[i].id);
      // }

      let a = new Date(this.startDate.setHours(this.startDate.getHours()+1));
      let startDate = a.toISOString();
      startDate = startDate.slice(0, -5);

      let b = new Date(this.endDate.setHours(this.endDate.getHours()+1));
      let endDate = this.endDate.toISOString();
      endDate = endDate.slice(0, -5);

      let booking = {
      "userID":this.authService.user.id,
      "title":this.Title,
      "start": startDate,
      "end": endDate,
      "message": message,
       "invites":this.peopleInvited,
       "entityID":this.entity.id,
       "notification":checkboxValue
    }
    console.log(booking);
    this.bookingService.createBooking(booking).subscribe(response =>{
      this.createBookingResponse = response;

      if(this.createBookingResponse.success){
      this._flashMessagesService.show(this.createBookingResponse.msg, { cssClass: 'alert-success', timeout: 3000 });
      this.loadCalendarEvent.emit();

        //clear the fields
        this.peopleInvited = [];
        this.Title = "";
        this.entity.id = "";
        this.entity.startDate = "";
        this.entity.endDate ="";
        this.entity.name = "";
        this.entity.available = "";
        this.entity.selected = false;
        this.text = "";
        this.checkbox = false;
        checkboxValue = false;
        message = "";
        this.startDate = new Date();
        this.endDate = new Date();
        this.authService.user.available = "";
        this.peopleInvited.push(this.authService.user);

      }
      else{
        a = new Date(this.startDate.setHours(this.startDate.getHours()-1));
        b = new Date(this.endDate.setHours(this.endDate.getHours()-1));
        console.log(this.createBookingResponse);
        if(this.createBookingResponse.hasOwnProperty('msg')){
          this._flashMessagesService.show(this.createBookingResponse.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
        else{
            this._flashMessagesService.show("Some people or entities are not available", { cssClass: 'alert-danger', timeout: 3000 });
            let conflicts = this.createBookingResponse.conflicts;
            console.log(conflicts);
            for(let i=0; i < this.peopleInvited.length; i++){
            let match = conflicts.indexOf(this.peopleInvited[i].id);

              if(match > -1){
                this.peopleInvited[i].available = "false";
              }
              else{
                this.peopleInvited[i].available = "true";
              }
            }
            if(conflicts.indexOf(this.entity.id) > -1){
              this.entity.available ="false";
            }
            else{
              this.entity.available = "true";
            }
        }
      }
    });
  }

  deleteUser(personID){
    let arrayOfInvitedPeopleId = [];
    for(let i=0; i < this.peopleInvited.length; i++)
    {

      arrayOfInvitedPeopleId.push(this.peopleInvited[i].id);
    }
    const index =  arrayOfInvitedPeopleId.indexOf(personID);
    if (index > -1) {
      console.log(index);
       this.peopleInvited.splice(index, 1);
    }
  }

  deleteEntity(){
    this.entity.selected = false;
  }

  onCloseBookingClick(){
    this.peopleInvited = [];
    this.Title = "";
    this.entity.id = "";
    this.entity.startDate = "";
    this.entity.endDate ="";
    this.entity.name = "";
    this.entity.available = "";
    this.entity.selected = false;
    this.text = "";
    this.checkbox = false;
    this.checkbox = false;
    this.text = "";
    this.startDate = new Date();
    this.endDate = new Date();
    this.authService.user.available = "";
    this.peopleInvited.push(this.authService.user);
  }

}
