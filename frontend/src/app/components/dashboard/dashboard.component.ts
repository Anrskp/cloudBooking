import { Component, OnInit } from '@angular/core';
import {BookingService} from '../../services/booking.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

//private  bookings:  Array<object> = [];
bookings: any;
user: any;

  constructor(private bookingService:BookingService) { }

  ngOnInit() {

    this.bookingService.getBookings(user).subscribe(data =>
      {
      this.bookings = data;
    });

  }




}
