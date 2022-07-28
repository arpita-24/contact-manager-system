import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contact.service';
import { Contact } from 'src/app/contact';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public getId:string=localStorage.getItem('userID');
  public con=new Contact('','','','',this.getId);
  public message!:String;
  public isError:boolean=false;
  public isSuccess:boolean=false;
  public confirmPass:boolean=true;
  public groups:string[]=['Work','Home','Friends','Relatives'];
  constructor(private _cs:ContactService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    
    this._cs.addContactData(this.con).subscribe(response=>{
    console.log(response)
    console.log(response.message)
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
