import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public user=new User('','','');
  public message!:string;
  public isError:boolean=false;
  public isSuccess:boolean=false;
  public confirmPass:boolean=true;

  constructor(private _userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
      this._userService.registerUser(this.user).subscribe(response=>{
      console.log(response)
      this.message=response.message
      this.isSuccess=true
      this.isError=false
    },err=>{
      console.log(err)
      this.message=err.error.message
      this.isSuccess= false
      this.isError= true
    })
  }


}
