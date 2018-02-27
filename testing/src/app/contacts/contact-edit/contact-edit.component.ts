import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: [
    './contact-edit.component.css'
  ]
})
export class ContactEditComponent implements OnInit {
  @ViewChild('f') contactForm: NgForm;
  contact: Contact = null;
  contactGroup: Contact[] = [];
  invalidGroupContact: boolean = false;
  original: Contact = null;
  editMode: boolean = false;
  hasGroup: boolean = false;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.original = this.contactService.getContact(params['id']);
      if (this.original) {
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.original));

        if (this.contact.group) {
          this.contactGroup = this.contact.group.slice();
        }
      }
    });
  }

  onSubmit(form: NgForm) {
    const contact: Contact = new Contact(String(this.contactService.getMaxId()),
      form.value.contactName, form.value.contactEmail,
      form.value.contactPhone, form.value.contactImageUrl, null);

    if (this.editMode) {
      this.contactService.updateContact(this.original, contact);
    } else {
      this.contactService.addContact(contact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(contact: Contact) {
    if (!contact || contact.id === this.contact.id) {
      return true;
    }

    return this.contactGroup.reduce((result: boolean, current: Contact) => {
      return result || contact.id === current.id;
    }, false);
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    if (!this.isInvalidContact(selectedContact)) {
        this.contactGroup.push(selectedContact);
    }
  }

  onRemoveItem(idx: number) {
    if (idx >= 0 && idx <= this.contactGroup.length) {
        this.contactGroup.splice(idx, 1);
    }
  }
}
