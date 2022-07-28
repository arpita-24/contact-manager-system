import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  registerUser(userRegInfo:any){
    return this._http.post<{message:string,user:any,token:string}>(environment.baseUserUrl+'/register',userRegInfo);
  }
  loginUser(userLoginInfo:any){
    return this._http.post<{message:string,user:any,token:string}>(environment.baseUserUrl+'/login',userLoginInfo);
  }

  isLoggedIn() : boolean {
    if(localStorage.getItem('token')===null)
    {
      return false
    }
    else{
      return !helper.isTokenExpired(localStorage.getItem('token'))
    }

    // checkLogin() : boolean {
    //   let userAuthToken:any = localStorage.getItem('token');
    //   if(userAuthToken === null){
    //     return false;
    //   } else {
    //     return !helper.isTokenExpired(userAuthToken);
    //   }
    // }


  }

}
