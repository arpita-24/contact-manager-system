import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public message!:String;
  public isSuccess:boolean=false;
  public isError:boolean=false;
  public email!:String;
  public password!:String;
  constructor(private _userService:UserService,private _router:Router) { }

  ngOnInit(): void {
  }
  onLogin(){
    const loginInfo={
      email:this.email,
      password:this.password
    }
    this._userService.loginUser(loginInfo).subscribe(response=>{
      // console.log(response)
      this.message=response.message;
      this.isError=false;
      this.isSuccess=true;
      localStorage.setItem('token',response.token);
      localStorage.setItem('userID',response.user.id);
      localStorage.setItem('userName',response.user.name);
      this._router.navigate(['contacts/list']);
    },err=>{
      // console.log(err)
      this.message=err.error.message;
      this.isError=true;
      this.isSuccess=false;
    })

  }

}
