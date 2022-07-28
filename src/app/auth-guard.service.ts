import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate
{

  constructor(private user:UserService,private router:Router) { }

  canActivate(){
    if(!this.user.isLoggedIn()){
      this.router.navigate(['/login'])
      return false
    }
    return true
  }
}
