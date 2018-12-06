import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  endpoint = 'http://localhost:3001';

  constructor(private http:HttpClient) { }


 getBookings(userID){
       let headers = new HttpHeaders();
       headers.append('Content-Type', 'application/json');
       return this.http.post(this.endpoint + '/booking/getBookings', userID, {headers: headers}).pipe(
          catchError(this.handleError('getBookings',[]))
        );
     }


  getBooking(bookingID){
       let headers = new HttpHeaders();
       headers.append('Content-Type', 'application/json');
       return this.http.post(this.endpoint + '/booking/getBookingByID', bookingID,{headers: headers}).pipe(
          catchError(this.handleError('getBooking'))
        );
     }



  createBooking(booking){
      let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.endpoint + '/booking/addNewBooking', booking, {headers: headers}).pipe(
       catchError(this.handleError('createBooking'))
     );
  }


  deleteBooking(bookingID){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.endpoint + '/booking/deleteBookingByID', bookingID,{headers: headers}).pipe(
       catchError(this.handleError('deleteBooking'))
     );
  }

  checkAvailability(person){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.endpoint + '/posts', person, {headers:headers}).pipe(
      catchError(this.handleError('checkAvailability'))
    );
  }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
