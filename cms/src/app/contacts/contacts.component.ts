import { Component, OnInit } from '@angular/core';
import { ContactService} from './contact.service';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
