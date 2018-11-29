import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  endpoint = 'http://localhost:3000';

  constructor(private http:HttpClient) { }


  //handlerError type of the sendEmail object missing
    sendEmail(mail){
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.post(this.endpoint + '/booking/sendEmailNotification', mail, {headers: headers}).pipe(
      tap(data => console.log('new email successfully sent', data)),
         catchError(this.handleError('sendEmail'))
       );
    }

    //handlerError type of the sendSms object missing
      sendSms(sms){
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.endpoint + '/booking/sendSmsNotification', sms, {headers: headers}).pipe(
        tap(data => console.log('new sms successfully sent', data)),
           catchError(this.handleError('sendSms'))
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
