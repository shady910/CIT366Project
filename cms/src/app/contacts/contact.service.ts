import { Injectable, Output, EventEmitter} from "@angular/core";
import {Contact} from './contacts.model';
import { MOCKCONTACTS} from "./MOCKCONTACTS";

@Injectable()
export class ContactService {
  contacts: Contact[] = [];
  @Output() contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.filter((contact: Contact) => {
      return contact.id === id;
    })[0] || null;
  }
}
