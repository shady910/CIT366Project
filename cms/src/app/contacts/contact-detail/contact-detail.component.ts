import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contacts.model';
import {ContactService} from "../contact.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  groupContacts: Contact[] = [];
@Input() contact: Contact;
  constructor(private contactsService: ContactService,
  private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.contact = this.contactsService.getContact(params['id']);
      this.groupContacts = this.contact.group;
    });
    console.log(this.contact.imageUrl)
  }

  // the delete button on the detail html
  onDelete() {
    this.contactsService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }

}
