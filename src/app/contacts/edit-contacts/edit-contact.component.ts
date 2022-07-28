import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contact.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/contact';
@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public contact=new Contact('','','','','');
  public message!:string;
  public isError:boolean=false;
  public isSuccess:boolean=false;
  public contactId!:string;
  public getId:string=localStorage.getItem('userID')??'null';
  public groups:string[]=['Work','Home','Friends','Relatives'];

  constructor(private _cs:ContactService,private _acroute:ActivatedRoute) { }

  ngOnInit(): void {
    this._acroute.params.subscribe(param=>{
      this.contactId=param.id;
    })

    this._cs.getContactById(this.contactId).subscribe(rs=>{
      console.log(rs);
      this.contact.userID=this.getId;
      this.contact.contactName=rs.contactsData.contactName
      this.contact.contactEmail=rs.contactsData.contactEmail
      this.contact.contactPhone=rs.contactsData.contactPhone
      this.contact.contactType=rs.contactsData.contactType

    },err=>{
      console.log(err);
    })
  }

  onSubmitForm(){
    this._cs.updateContact(this.contactId,this.contact).subscribe(rs=>{
      console.log(rs)
      this.message=rs.message;
      this.isError=false;
      this.isSuccess=true;
    },err=>{
      console.log(err)
      this.message=err.error.message;
      this.isError=true;
      this.isSuccess=false;
    })
  }

}
