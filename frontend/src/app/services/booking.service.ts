import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  endpoint = 'http://192.168.99.100:5002';
  testEndpoint = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getUserBookings(userID) {
    return this.http.get(this.endpoint + '/booking/' + userID).pipe(
      catchError(this.handleError('getUserBookings', []))
    );
  }

  getEntityBookings(entityID) {
    return this.http.get(this.testEndpoint + '/booking/entityBookings/' + entityID).pipe(
      catchError(this.handleError('getEntityBookings'))
    );
  }


  getBooking(bookingID) {
    return this.http.get(this.endpoint + '/booking/getBookingByID/' + bookingID).pipe(
      catchError(this.handleError('getBooking'))
    );
  }

  createBooking(booking) {
    return this.http.post(this.endpoint + '/booking/addNewBooking', booking, httpOptions).pipe(
      catchError(this.handleError('createBooking'))
    );
  }

  getRooms() {
    return this.http.get(this.testEndpoint + '/entity').pipe(
      catchError(this.handleError('getRooms'))
    );
  }

  // deleteBooking(bookingID){
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post(this.endpoint + '/booking/deleteBookingByID', bookingID,{headers: headers}).pipe(
  //      catchError(this.handleError('deleteBooking'))
  //    );
  // }

  checkAvailability(person) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.endpoint + '/posts', person, httpOptions).pipe(
      catchError(this.handleError('checkAvailability'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
