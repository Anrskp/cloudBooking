import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // private bookingSource = new Subject<any>();
  // bookings$ = this.bookingSource.asObservable();

  endpoint = 'http://192.168.99.100:5000/booking';
  testEndpoint = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getUserBookings(userID) {
    return this.http.get(this.endpoint + '/' + userID).pipe(
    //  tap(response => this.bookingSource.next(response);),
      catchError(this.handleError('getUserBookings', []))
    );
  }

  getEntityBookings(entityID) {
    return this.http.get(this.endpoint + '/entity/' + entityID).pipe(
      catchError(this.handleError('getEntityBookings'))
    );
  }


  getBooking(bookingID) {
    return this.http.get(this.endpoint + '/getBookingByID/' + bookingID).pipe(
      catchError(this.handleError('getBooking'))
    );
  }

  createBooking(booking) {
    return this.http.post(this.endpoint, booking, httpOptions).pipe(
      catchError(this.handleError('createBooking'))
    );
  }

  // getRooms() {
  //   return this.http.get(this.testEndpoint + '/entity').pipe(
  //     catchError(this.handleError('getRooms'))
  //   );
  // }

  // deleteBooking(bookingID){
  //   let headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post(this.endpoint + '/booking/deleteBookingByID', bookingID,{headers: headers}).pipe(
  //      catchError(this.handleError('deleteBooking'))
  //    );
  // }

  checkUserAvailability(userinfo) {
    return this.http.get(this.endpoint + '/userAvailability/'+ userinfo.id + '/' + userinfo.startDate + '/' + userinfo.endDate, httpOptions).pipe(
      catchError(this.handleError('checkAvailability'))
    );
  }

  checkEntityAvailability(entityInfo) {
    return this.http.get(this.endpoint + '/entityAvailability/'+ entityInfo.id + '/' + entityInfo.startDate + '/' + entityInfo.endDate, httpOptions).pipe(
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
