import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contact.service';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent implements OnInit {
  public contactData:any[]=[];
  constructor(private _cs:ContactService) { }

  ngOnInit(): void {
    this._cs.listAllContactsByUser().subscribe(res=>{
      this.contactData=res.contactsData;
    },err=>{
      console.log(err)
    })
  }

}
