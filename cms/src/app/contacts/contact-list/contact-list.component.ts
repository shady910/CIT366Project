import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Contact} from '../contacts.model';
import { ContactService} from "../contact.service";
import {Subscription} from "rxjs/Subscription";
import { ContactsFilterPipe} from "../../contacts-filter.pipe";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
  export class ContactListComponent implements OnInit{
  contacts: Contact[];
  // subscribe
  subscription: Subscription;
// initate an empty term string
  term: string ='';
  constructor(private contactService: ContactService) {

}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contacts: Contact[])  => {
      this.contacts = contacts;
    });
  }

  onSelected(contact: Contact){
    this.contactService.contactSelectedEvent.emit(contact);
  }
  // New onKeyPress function which connects with the searchBox
  onKeyPress(value: string){
    this.term = value;
  }

}
