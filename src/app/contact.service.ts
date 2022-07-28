import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public authToken=localStorage.getItem('token')??'null' ;
//  private _url="http://localhost:4400/api/contacts/60c04dfbfd986753a8a5d7c7"
  constructor(private _http: HttpClient) { }

  // listAllContacts(){
  //   return this._http.get<{message:String,contactsData:any}>(environment.baseContactsUrl);
  // }

  listAllContactsByUser(){
    return this._http.get<{message:String,contactsData:any}>(environment.baseContactsUrl+'/'+localStorage.getItem('userID'),{
      headers: new HttpHeaders().set('x-auth-token',localStorage.getItem('token')!)
    })
  }

  getContactById(id:string){
    return this._http.get<{message:String,contactsData:any}>(environment.baseContactsUrl+'/'+id,{
      headers: new HttpHeaders().set('x-auth-token',localStorage.getItem('token')!)
    })

  }

  addContactData(contacts:any){
    console.log(Response)
    return this._http.post<{message:String,contactsData:any}>(environment.baseContactsUrl+'/save',contacts,{
      headers: new HttpHeaders().set('x-auth-token',localStorage.getItem('token')!)
    })
  }
  updateContact(id:string,contact:any){
    return this._http.put<{message:string,contactData:any}>(environment.baseContactsUrl+'/update/'+id,contact,{
      headers: new HttpHeaders().set('x-auth-token',this.authToken)
    })
  }

  deleteContact(id:string,contact:any){
    return this._http.delete<{message:string,contactData:any}>(environment.baseContactsUrl+'/delete/'+id,{
      headers: new HttpHeaders().set('x-auth-token',this.authToken)
    })
  }
}
