import { Injectable, Output, EventEmitter, OnDestroy, OnInit} from "@angular/core";
import {Contact} from './contacts.model';
import { MOCKCONTACTS} from "./MOCKCONTACTS";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";


@Injectable()
export class ContactService implements OnDestroy, OnInit {
  contacts: Contact[] = [];
  subscription: Subscription;
  @Output() contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  @Output() contactChange: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
  // the subject event
  contactListChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();
  maxContactId: number;
  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }
  // get maxId
  getMaxId(): number {
   let maxId = 0;
   for (let contact of this.contacts){
     let currentId = +contact.id;
     if(currentId > maxId){
       maxId = currentId;
     }
   }
    return maxId;
  }

// add Contact
  addContact(contact: Contact){
    if (contact) {
      contact.id = String(++this.maxContactId);

      this.contacts.push(contact);
      this.contactListChangedEvent.next(this.getContacts());
    }
  }
  //update Contact
  updateContact(original: Contact, updated: Contact){
    var pos;
    if (original && updated && ( pos = this.contacts.indexOf(original)) >= 0){
      updated.id = original.id;
      this.contacts[pos] = updated;
      this.contactListChangedEvent.next(this.getContacts());
    }
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
ngOnInit(){
this.subscription = this.contactListChangedEvent.subscribe();
}
   ngOnDestroy() {
    this.contactListChangedEvent.unsubscribe();
   }
}
