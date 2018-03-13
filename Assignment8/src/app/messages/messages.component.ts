import { Component, OnInit } from '@angular/core';
import {Message} from "./message.model";
import {MessagesService} from "./messages.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [MessagesService]
})
export class MessagesComponent implements OnInit {

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
  }

}
