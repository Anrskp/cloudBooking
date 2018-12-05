import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

endpoint = 'http://localhost:4000/users';
endpoint_company = 'http://localhost:3000/company';
//endpoint = "https://jsonplaceholder.typicode.com"
authToken: any;
user: any;

  constructor(private http: HttpClient) { }


  registerUser(user){
     let headers = new HttpHeaders();
     headers.append('Content-Type', 'application/json');
     console.log(user);
     return this.http.post(this.endpoint + '/register', user,{headers: headers}).pipe(
     catchError(this.handleError('registerUser'))
   );
  }

  authenticateUser(user){

   let headers = new HttpHeaders();
   headers.append('Content-Type', 'application/json');
   return this.http.post(this.endpoint + '/authenticate', user,{headers: headers}).pipe(
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

  getAllUsers(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.endpoint + '/posts', {headers: headers}).pipe(
    tap(data => console.log('user successfully fetched', data)),
    catchError(this.handleError('getAllUsers'))
    );
  }

  checkIfCompanyExist(companyName){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.endpoint_company + '/checkCompany', companyName, {headers:headers}).pipe(
      tap(data => console.log('company exist', data)),
      catchError(this.handleError('checkIfCompanyExist'))
    );
  }


  storeUserData(token, user){
  localStorage.setItem('id_token', token);
  localStorage.setItem('user', JSON.stringify(user));
  this.authToken = token;
  this.user = user;
  }

loadToken(){
  const token = localStorage.getItem('id_token');
  this.authToken = token;
}

loggedIn(){
  return tokenNotExpired('id_token');

}

logout(){
  this.authToken = null;
  this.user = null;
  localStorage.clear();
}

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    console.error(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
