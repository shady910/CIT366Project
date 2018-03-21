import { Injectable, Output, EventEmitter, OnDestroy, OnInit} from "@angular/core";
import {Contact} from './contacts.model';
import { MOCKCONTACTS} from "./MOCKCONTACTS";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import {Response, Http, Headers} from "@angular/http";
import 'rxjs/Rx';


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
  jsonUrl: string='https://cit366cms.firebaseio.com/contacts.json';

  constructor(private http: Http) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
    // call the init function
    this.initContacts();
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

    this.http.post('http://localhost:3000/contacts', strContact, {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
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

    this.http.patch('http://localhost:3000/contacts/' + originalContact.id, strContact, {headers: headers})
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

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.filter((contact: Contact) => {
      return contact.id === id;
    })[0] || null;
}
// delete function updated according to A9 instruction
  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.id)
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

  storeContacts(){
    // put request overwrites data
    this.http.put(this.jsonUrl, JSON.stringify(this.contacts))
      .subscribe(() => {
        this.contactListChangedEvent.next(this.getContacts());
      });
  }

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
ngOnInit(){
this.subscription = this.contactListChangedEvent.subscribe();
}
   ngOnDestroy() {
    this.contactListChangedEvent.unsubscribe();
   }
}
