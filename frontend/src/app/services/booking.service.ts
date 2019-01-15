import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  // private bookingSource = new Subject<any>();
  // bookings$ = this.bookingSource.asObservable();
  //endpoint = 'http://localhost:5000/booking';

  endpoint = 'http://192.168.99.100:5000/booking';
  testEndpoint = 'https://jsonplaceholder.typicode.com';
  authToken:any;
  httpOptions;

  constructor(private http: HttpClient) { }

  getUserBookings(userID) {
    return this.http.get(this.endpoint + '/' + userID, this.httpOptions).pipe(
      catchError(this.handleError('getUserBookings', []))
    );
  }

  getEntityBookings(entityID) {
    return this.http.get(this.endpoint + '/entity/' + entityID, this.httpOptions).pipe(
      catchError(this.handleError('getEntityBookings'))
    );
  }


  getBooking(bookingID) {
    return this.http.get(this.endpoint + '/getBookingByID/' + bookingID, this.httpOptions).pipe(
      catchError(this.handleError('getBooking'))
    );
  }

  createBooking(booking) {
    return this.http.post(this.endpoint, booking, this.httpOptions).pipe(
      catchError(this.handleError('createBooking'))
    );
  }

  deleteBooking(bookingID){

    return this.http.delete(this.endpoint + '/' + bookingID, this.httpOptions).pipe(
       catchError(this.handleError('deleteBooking'))
     );
  }

  checkUserAvailability(userinfo) {
    return this.http.get(this.endpoint + '/userAvailability/'+ userinfo.id + '/' + userinfo.startDate + '/' + userinfo.endDate, this.httpOptions).pipe(
      catchError(this.handleError('checkAvailability'))
    );
  }

  checkEntityAvailability(entityInfo) {
    return this.http.get(this.endpoint + '/entityAvailability/'+ entityInfo.id + '/' + entityInfo.startDate + '/' + entityInfo.endDate, this.httpOptions).pipe(
      catchError(this.handleError('checkAvailability'))
    );
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': token}) };
    console.log(this.httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
