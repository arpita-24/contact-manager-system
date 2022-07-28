import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { AddContactFormComponent } from './add-contact-form/add-contact-form.component';
import { ListContactsComponent } from './contacts/list-contacts/list-contacts.component';
import { EditContactComponent } from './contacts/edit-contact/edit-contact.component';
import { DeleteComponent } from './contacts/delete/delete.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"contacts/list",component:ListContactsComponent,canActivate:[AuthGuardService]},
  {path:"contacts/add",component:AddContactComponent,canActivate:[AuthGuardService]},
  {path:"contacts/edit/:id",component:EditContactComponent,canActivate:[AuthGuardService]},
  {path:"contacts/delete/:id",component:DeleteComponent,canActivate:[AuthGuardService]},
  {path:"**",component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
