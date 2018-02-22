import { Component, OnInit } from '@angular/core';
import {Contact} from "../contacts.model";
import { ContactService} from "../contact.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {NgForm} from "@angular/forms";



@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
contact: Contact = null;
groupContacts: Contact[] = [];
  original: Contact;
  editMode: boolean = false;
  invalidGroupContact: boolean = false;

  constructor(private contactsService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)  => {this.original = this.contactsService.getContact(params['id']);
      if (this.original) {
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.original));
      }
    });
  }




// The onSubmit method
  onSubmit(form: NgForm){
    const contact: Contact = new Contact(String(this.contactsService.getMaxId()),
      form.value.name, form.value.email, form.value.phone, form.value.url,  null);


    if (this.editMode) {
      this.contactsService.updateContact(this.original, contact);
    }
    else {
      this.contactsService.addContact(contact);
    }
    this.router.navigate(['/contacts']);
  }



  // the onCancel method
  onCancel() {
    this.router.navigate(['/contacts']);
  }




  // invalid contact method
  isInvalidContact(newContact: Contact) {
    if(!newContact){
      return true;
    }
    if (newContact.id === this.contact.id){
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id){
        return true;
      }
    }
    return false;
  }



  // add new function that adds to group
  addToGroup($event: any){
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }



    onRemoveItem(idx: number){
   if(idx < 0 || idx >= this.groupContacts.length)
     return;
   this.groupContacts.splice(idx, 1);
   this.invalidGroupContact = false;
    }




}
