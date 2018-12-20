import { Component, OnInit,Input, EventEmitter, Output} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {BookingService} from '../../services/booking.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from "@angular/router"
import { CompleterService, CompleterData,CompleterItem } from 'ng2-completer';
import { FormControl } from '@angular/forms';


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
    private completerService: CompleterService){}

  @Output() createBookingEvent = new EventEmitter();
  @Output() saveBookingEvent = new EventEmitter();
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
      format: 'dd-MM-yyyy HH:mm',
      defaultOpen: false
    }


  peopleInvited = [];
  entitiesInvolved = [];

  // private testArray:Array;

  // getArray(){
  //   return this.testArray;
  // }
  //
  // @Input()
  // setArray(value:Array){
  //   this.testArray = value;
  // }
  username:string;

  ngOnInit() {

    this.authService.navbarEntities$.subscribe(
    array => {
      this.dataServiceEntities = this.completerService.local(array.entities, 'name','name');
    });

    this.authService.navbarEmployees$.subscribe(
    array => {
      this.dataServiceEmployees = this.completerService.local(array.users, 'name','name');
    });

    this.authService.getListOfEntities("employee", this.authService.user.companyID);
    this.authService.getListOfEntities("entity",  this.authService.user.companyID);

    this.username = this.authService.user.name;

  }

  onItemSelectEmployee(selected:CompleterItem){
    if(selected){
    console.log(this.startDate.toISOString())
    let user = {"id":selected.originalObject.id, "name":selected.originalObject.name, "startDate":this.startDate,"endDate":this.endDate, "available":""}
    console.log(user);
      if(this.checkUserAvailability(user)){
        user.available = "true";

      }else{
        user.available = "false";
      }
      this.peopleInvited.push(user)
      this.searchStrEmployees = "";
    }

  }

  onItemSelectEntity(selected:CompleterItem){
    if(selected){
    let entity = {"id":selected.originalObject.id, "name":selected.originalObject.name, "startDate":this.startDate,"endDate":this.endDate, "available":""}
    console.log(entity);
      if(this.checkEntityAvailability(entity)){
        entity.available = "true";

      }else{
        entity.available = "false";
      }
      this.entitiesInvolved.push(entity)
      this.searchStrEntitites = "";
    }

  }

  checkUserAvailability(user){
    this.bookingService.checkUserAvailability(user).subscribe(response => console.log(response));
    return true;
  }

  checkEntityAvailability(entity){
    this.bookingService.checkEntityAvailability(entity).subscribe(response => console.log(response));
    return true
  }

  onLogoutClick(){
    this.authService.logout();
  }

    sendArrayToAuthService(type){
      this.authService.getListOfEntities(type, this.authService.user.companyID);
    }

    callDashboardCreateBooking(){
      this.createBookingEvent.emit();
    }

    onSendClick(){
      this.saveBookingEvent.emit(this.peopleInvited);
    }
}
