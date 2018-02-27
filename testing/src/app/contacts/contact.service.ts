import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {
  contactListChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;
  @Output() contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId: number = 0;

    this.contacts.forEach((contact: Contact) => {
      let currentId: number = Number(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.filter((contact: Contact) => {
      return contact.id === id;
    })[0] || null;
  }

  addContact(contact: Contact) {
    if (contact) {
      contact.id = String(++this.maxContactId);
      this.contacts.push(contact);
      this.contactListChangedEvent.next(this.getContacts());
    }
  }

  updateContact(original: Contact, updated: Contact) {
    let pos;
    if (original && updated && (pos = this.contacts.indexOf(original)) >= 0) {
      updated.id = original.id;
      this.contacts[pos] = updated;
      this.contactListChangedEvent.next(this.getContacts());
    }
  }

  deleteContact(contact: Contact) {
    let pos;
    if (contact && (pos = this.contacts.indexOf(contact)) >= 0) {
      this.contacts.splice(pos, 1);
      this.contactListChangedEvent.next(this.getContacts());
    }
  }
}
