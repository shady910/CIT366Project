import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { DropdownDirective} from "./shared/dropdown.directive";
import {FormsModule} from "@angular/forms";
import { ContactService} from "./contacts/contact.service";
import { MessagesService} from "./messages/messages.service";
import { DocumentsService} from "./documents/documents.service";

@NgModule({



  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentItemComponent,
    DocumentListComponent,
    DocumentDetailComponent,
    MessagesComponent,
    MessageItemComponent,
    MessageListComponent,
    MessageEditComponent,
    DropdownDirective
    ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ContactService, MessagesService, DocumentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
