import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import { ActivatedRoute } from "@angular/router"



@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private authService:AuthenticationService,
    private router:Router,
    private route: ActivatedRoute){}

  canActivate(){
    if(this.authService.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/404']);
      return false;
    }
  }

  }
