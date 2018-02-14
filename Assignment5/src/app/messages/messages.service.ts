import {Injectable, EventEmitter, Output} from "@angular/core";
import {Message} from "./message.model";
import {MOCKMESSAGES} from "./MOCKMESSAGES";

@Injectable()
export class MessagesService {
  @Output() messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];

  constructor(){
    this.messages = MOCKMESSAGES;
  }
  getMessages(): Message[] {
    return this.messages.slice();
  }
  getMessage(id: string): Message {
    return this.messages.filter((message: Message) => {
      return message.id === id;
    })[0] || null;
  }
  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }
}
