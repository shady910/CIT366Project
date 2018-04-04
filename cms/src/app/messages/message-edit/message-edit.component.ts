import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import {MessagesService} from "../messages.service";
import {ContactService} from "../../contacts/contact.service";

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
@ViewChild ('subjectInput') subjectInputRef: ElementRef;
@ViewChild ('msgTextInput') msgTextInputRef: ElementRef;
@Output() addMessageEvent = new EventEmitter<Message>();
currentSender = '1';
  constructor(private messagesService: MessagesService,
              private contactsService: ContactService){ }

  ngOnInit() {
  }
 onSendMessage() {
    const getSubject = this.subjectInputRef.nativeElement.value;
    const getMsgText = this.msgTextInputRef.nativeElement.value;
    const senderName = this.contactsService.getContact(this.currentSender);
    const newMessage = new Message (null, getSubject, getMsgText, senderName);
    this.addMessageEvent.emit(newMessage);
   this.messagesService.addMessage(newMessage);
 }

 onClear() {
    this.subjectInputRef.nativeElement.value = null;
    this.msgTextInputRef.nativeElement.value = null;
 }
}
