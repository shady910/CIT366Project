import {Injectable, EventEmitter, Output} from "@angular/core";
import {Message} from "./message.model";
import {MOCKMESSAGES} from "./MOCKMESSAGES";
import {Response, Http, Headers} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class MessagesService {
  @Output() messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  // jsonUrl
  jsonUrl: string= 'https://cit366cms.firebaseio.com/messages.json';
  maxMsgId: number;

  constructor(private http: Http){
    this.messages = MOCKMESSAGES;
    this.maxMsgId = this.getMaxId();
    this.initMessages();
  }
  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.messages){
      let currentId = +contact.id;
      if(currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }
  getMessage(id: string): Message {
    return this.messages.filter((message: Message) => {
      return message.id === id;
    })[0] || null;
  }

  // addMessage updated according A9 instructions
  addMessage(message: Message) {
    if(!message) {
      return;
    }

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    message.id = '';
    const strMessage = JSON.stringify(message);

    this.http.post('http://localhost:3000/messages', strMessage, {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.messageChangeEvent.next(this.messages.slice());
        }
      )
  }


    storeMessages(){
  // put request overwrites data
  this.http.put(this.jsonUrl, JSON.stringify(this.messages))
.subscribe(() => {
  this.messageChangeEvent.next(this.getMessages());
});
}

initMessages(){
  // Base off of the getRecipes from the downloadable
  // first get
  this.http.get(this.jsonUrl)
  // use the map function
    .map((response: Response) => {
      const messages: Message[] = response.json();
      return messages;
    })
    .subscribe((messages: Message[]) => {
      this.messages = messages;
      this.maxMsgId = this.getMaxId();
      this.messageChangeEvent.next(this.getMessages());
    })
}
}
