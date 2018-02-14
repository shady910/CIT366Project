import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
@ViewChild ('subjectInput') subjectInputRef: ElementRef;
@ViewChild ('msgTextInput') msgTextInputRef: ElementRef;
@Output() addMessageEvent = new EventEmitter<Message>();
currentSender = 'Sharon Miller';
  constructor() { }

  ngOnInit() {
  }
 onSendMessage() {
    const getSubject = this.subjectInputRef.nativeElement.value;
    const getMsgText = this.msgTextInputRef.nativeElement.value;
    const senderName = this.currentSender;
    const newMessage = new Message (null, getSubject, getMsgText, senderName);
    this.addMessageEvent.emit(newMessage);
 }

 onClear() {
    this.subjectInputRef.nativeElement.value = null;
    this.msgTextInputRef.nativeElement.value = null;
 }
}
