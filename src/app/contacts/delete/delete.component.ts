import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contact.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'src/app/contact';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  public contact=new Contact('','','','','');
  public message!:string;
  public isError:boolean=false;
  public isSuccess:boolean=false;
  public contactId!:string;
  public getId:string=localStorage.getItem('userID')??'null';
  public cname!:string;
  constructor(private _cs:ContactService,private _acroute:ActivatedRoute) { }

  ngOnInit(): void {

    this._acroute.params.subscribe(param=>{
      this.contactId=param.id;
    })
  }
  onYesDelete(){
    console.log(this.contactId);

    this._cs.deleteContact(this.contactId,this.contact).subscribe(rs=>{
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
