import { Injectable, Output, EventEmitter, OnDestroy, OnInit} from "@angular/core";
import {Contact} from './contacts.model';
import { MOCKCONTACTS} from "./MOCKCONTACTS";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import {Response, Http, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Document} from "../documents/document.model";


@Injectable()
export class ContactService implements OnDestroy, OnInit {
  contacts: Contact[] = [];
  subscription: Subscription;
  @Output() contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  contactChange: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
  // the subject event
  contactListChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();
  maxContactId: number;
  // define the contact get url
  jsonUrl: string='http://localhost:3000/api/contacts';

  constructor(private http: Http) {
    //this.contacts = MOCKCONTACTS;
    //this.maxContactId = this.getMaxId();
    // call the init function
    this.initContacts();
  }
  // get all Contacts
  getContacts(): Contact[] {
    return this.contacts.slice();
  }
// get one contact
  getContact(id: string): Contact {
    return this.contacts.filter((contact: Contact) => {
      return contact.id === id;
    })[0] || null;
  }
// store the contact
  storeContacts(){
    // put request overwrites data
    this.http.put(this.jsonUrl, JSON.stringify(this.contacts))
      .subscribe(() => {
        this.contactListChangedEvent.next(this.getContacts());
      });
  }
// put the lifecycle to work
  initContacts(){
    // Base off of the getRecipes from the downloadable
    // first get
    this.http.get(this.jsonUrl)
    // use the map function
      .map((response: Response) => {
        const contacts: Contact[] = response.json();
        return contacts;
      })
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contactListChangedEvent.next(this.getContacts());
      })
  }
  // get maxId
  getMaxId(): number {
   let maxId = 0;
    this.contacts.forEach((contact: Contact) => {
      let currentId: number = Number(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }



// add Contact updated according to A9 instructions
  addContact(contact: Contact) {
    if(!contact) {
      return;
    }

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    contact.id = '';
    const strContact = JSON.stringify(contact);

    this.http.post('http://localhost:3000/api/contacts', strContact, {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (contact: Contact) => {
          this.contacts.push(contact);
          this.contactChange.next(this.contacts.slice());
        }
      )
  }
  //update Contact function according to A9 instructions
  updateContact(originalContact: Contact, newContact: Contact) {
    if(!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if(pos < 0) { // original contact not in list
      return;
    }

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const strContact = JSON.stringify(newContact);

    this.http.patch('http://localhost:3000/api/contacts/' + originalContact.id, strContact, {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (contact: Contact) => {
          this.contacts[pos] = contact;
          this.contactChange.next(this.contacts.slice());
        });
  }


// delete function updated according to A9 instruction
  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if(pos < 0) { // original document not in list
      return;
    }

    this.http.delete('http://localhost:3000/api/contacts/' + contact.id)
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactChange.next(this.contacts.slice());
        });
  }


ngOnInit(){
this.subscription = this.contactListChangedEvent.subscribe();
}
   ngOnDestroy() {
    this.contactListChangedEvent.unsubscribe();
   }
}
