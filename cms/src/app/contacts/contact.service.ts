import { Injectable, Output, EventEmitter} from "@angular/core";
import {Contact} from './contacts.model';
import { MOCKCONTACTS} from "./MOCKCONTACTS";


@Injectable()
export class ContactService {
  contacts: Contact[] = [];
  @Output() contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() contactChange: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
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

  deleteContact(contact: Contact){
    if (contact === null){
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0){
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChange.emit(this.contacts.slice());
  }
}
