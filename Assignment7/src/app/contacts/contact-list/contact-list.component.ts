import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Contact} from '../contacts.model';
import { ContactService} from "../contact.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
  export class ContactListComponent implements OnInit{
  contacts: Contact[];

  constructor(private contactService: ContactService) {

}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactListChangedEvent.subscribe((contacts: Contact[])  => {
      this.contacts = contacts;
    });
  }

  onSelected(contact: Contact){
    this.contactService.contactSelectedEvent.emit(contact);
  }

}
