import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

endpoint = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }


  registerUser(user){
     let headers = new HttpHeaders();
     headers.append('Content-Type', 'application/json');
     console.log(user);
     return this.http.post(this.endpoint + '/register', user,{headers: headers}).pipe(
     tap(data => console.log('user successfully registered ', data)),
     catchError(this.handleError('registerUser'))
   );
  }

  authenticateUser(user){

   let headers = new HttpHeaders();
   headers.append('Content-Type', 'application/json');
   return this.http.post(this.endpoint + '/authenticate', user,{headers: headers}).pipe(
     tap(data => console.log('user successfully authenticated',data)),
     catchError(this.handleError('authenticateUser'))
   );
  }

  deleteUser(user){
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  return this.http.post(this.endpoint + '/deleteUser', user,{headers: headers}).pipe(
  tap(data => console.log('user successfully deleted',data)),
  catchError(this.handleError('deleteUser'))
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
