import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Contact} from '../contacts.model';
import { ContactService} from "../contact.service";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
  export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[];

  constructor(private contactService: ContactService) {

}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  onSelected(contact: Contact){
    this.selectedContactEvent.emit(contact);
  }

}
