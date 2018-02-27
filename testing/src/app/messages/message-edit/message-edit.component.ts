import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html'
})
export class MessageEditComponent implements OnInit {
  @Input() subject: string;
  @Input() msgText: string;
  @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('messageInput') messageInputRef: ElementRef;

  currentId: number = 1;
  currentSender: string = '7';
  // This part threw me for a loop. Naming it "currentSenderId" in the initial
  // instructions might be a helpful adjustment!

  constructor(private messageService: MessageService) { }

  ngOnInit() { }

  onSendMessage() {
    this.subject = this.subjectInputRef.nativeElement.value;
    this.msgText = this.messageInputRef.nativeElement.value;
    this.messageService.addMessage(new Message(String(this.currentId++), this.subject,
      this.msgText, this.currentSender));
    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }
}
