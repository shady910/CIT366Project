import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Output() selectedMessageEvent = new EventEmitter<Message>();
  messages: Message[]= [
    new Message(
      '1',
      'Wake up',
      'I did not want to wake up today?',
      'Sharon Miller'),
    new Message('2',
      'Wakeup!?',
      ' I get you! Waking up is the hardest',
      'Shantelle Fox'),
    new Message('3',
      'I am going back to sleep',
      'I can sleep in today. So stop bothering me.',
      'James Fox')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
  constructor() { }

  ngOnInit() {
  }

}
