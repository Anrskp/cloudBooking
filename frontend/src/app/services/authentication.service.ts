import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  endpoint = 'http://192.168.99.100:5001/users';
  companyEndpoint = 'http://192.168.99.100:5003/company';
  testEndpoint = "https://jsonplaceholder.typicode.com";
  authToken: any;
  user: any;
  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post(this.endpoint + '/register', user, httpOptions).pipe(
      catchError(this.handleError('registerUser'))
    );
  }

  authenticateUser(user) {
    return this.http.post(this.endpoint + '/authenticate', user, httpOptions).pipe(
      catchError(this.handleError('authenticateUser'))
    );
  }

  deleteUser(user) {
    return this.http.post(this.endpoint + '/deleteUser', user, httpOptions).pipe(
      catchError(this.handleError('deleteUser'))
    );
  }

  getAllCompanyEmployees(companyTag) {
    return this.http.get(this.testEndpoint + '/posts/' + companyTag + "/comments").pipe(
      catchError(this.handleError('getAllEmployees'))
    );
  }

  checkIfCompanyExist(companyName) {
    return this.http.post(this.companyEndpoint + '/getCompanyByTag', companyName, httpOptions).pipe(
      catchError(this.handleError('checkIfCompanyExist'))
    );
  }


  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');

  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
