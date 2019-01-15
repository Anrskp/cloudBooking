import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of,Subject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';
 import {IUser} from '../models/user'
// import {IResponse} from '../models/response'


const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':this.authToken })};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  usersEndpoint = 'http://localhost:5000/user';
  //usersEndpoint = 'http://192.168.99.100:5000/user';

  //companyEndpoint = 'http://192.168.99.100:5000/company';
  companyEndpoint = 'http://localhost:5000/company';


  authToken: any;
  user: any;
  private listOfEntitiesSource = new Subject<any>();
  private entityListNameSource = new Subject<string>();
  private navbarEntitySource = new Subject<any>();
  private navbarEmployeeSource = new Subject<any>();

  listOfEntities$ = this.listOfEntitiesSource.asObservable();
  entityListName$ = this.entityListNameSource.asObservable();

  navbarEntities$ = this.navbarEntitySource.asObservable();
  navbarEmployees$ = this.navbarEmployeeSource.asObservable();
  entities:any;
  employees:any;

  constructor(private http: HttpClient) { }

  getListOfEntities(type,companyID){
    if(type == "entity"){
    //let array  = [{ "id": "1", "name": "Conference room" , "email":"something@gmail.com", "password":"123456"}, { "id": "2", "name": "Dining room" , "email":"something@gmail.com", "password":"123456"}];
      return this.http.get(this.companyEndpoint + '/entities/' + companyID).subscribe(
        response => {
          this.entities = response;
          if(this.entities.success == false){
            console.log(this.entities.msg);
          }else{
            let object  = {"entities":this.entities.result[0].entities, "type":"Entities"}
            this.listOfEntitiesSource.next(object),
            this.entityListNameSource.next(object.type);
            //variable for navbarRe
            this.navbarEntitySource.next(object);
          }

      });
    }
    if(type == "employee"){
    //let array = [{ "id": "5c07bbe05bf0360f9407ee27", "name": "Ogyun" }, { "id": "5c1a192f747d2716b02c2ddd", "name": "Anders" }, { "id": "3", "name": "John" }]
    return this.http.get(this.usersEndpoint + '/' + companyID).subscribe(
      response => {
      this.employees = response;
      if(this.employees.success == false){
        console.log(this.employees.msg);
      }else{
        let object  = {"users":this.employees.users, "type":"Employees"}
        this.listOfEntitiesSource.next(object),
        this.entityListNameSource.next(object.type);
        //variable for navbarRe
        this.navbarEmployeeSource.next(object);
      }

    });
    }

  }


  registerUser(user) {
    return this.http.post(this.usersEndpoint + '/register', user, httpOptions).pipe(
      catchError(this.handleError('registerUser'))
    );
  }

  authenticateUser(user){
    return this.http.post(this.usersEndpoint + '/authenticate', user, httpOptions).pipe(
      catchError(this.handleError('authenticateUser'))
    );
  }

  deleteUser(userID) {
    return this.http.delete(this.usersEndpoint + '/' + userID, httpOptions).pipe(
      catchError(this.handleError('deleteUser'))
    );
  }


createEntity(companyID, entity){
  return this.http.put(this.companyEndpoint + '/entities/' + companyID, entity, httpOptions).pipe(
    catchError(this.handleError('createEntity'))
  );
}

  deleteEntity(companyID, entityID){
    return this.http.delete(this.companyEndpoint + '/' + companyID +'/' + entityID,httpOptions).pipe(
      catchError(this.handleError('deleteEntity'))
    );
  }

  getAllCompanyEmployees(companyTag) {
    return this.http.get(this.companyEndpoint + '/posts/' + companyTag + "/comments").pipe(
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
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    const user = JSON.parse(localStorage.getItem('user'));
    this.authToken = token;
    this.user = user;
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
