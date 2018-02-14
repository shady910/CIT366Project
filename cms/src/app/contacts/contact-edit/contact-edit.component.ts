import { Component, OnInit } from '@angular/core';
import {Contact} from "../contacts.model";
import { ContactService} from "../contact.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Document} from "../../documents/document.model";


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
}
