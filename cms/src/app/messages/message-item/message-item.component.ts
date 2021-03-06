import {Component, Input, OnInit} from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contacts.model';
import {ContactService} from "../../contacts/contact.service";
@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: Contact;
  constructor( private contactService : ContactService) { }

  ngOnInit() {
let contact: Contact = this.contactService.getContact(this.message.sender.id);
this.messageSender = contact;
  }

}
