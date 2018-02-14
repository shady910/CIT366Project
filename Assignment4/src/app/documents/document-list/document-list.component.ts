import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

@Output() selectedDocumentEvent = new EventEmitter<Document>();
@Input() documents: Document[] = [
  new Document(
    '1',
    'Idontknow',
    'confusion',
    'google.com',
    null
  ),
  new Document(
    '2',
    'Tryingto',
    'Effort',
    'google..com',
    null
  ),
  new Document(
    '3',
    'Freedom',
    'Flying free',
    'google.com',
    null
  ),
  new Document(
    '4',
    'Getting there',
    'Destination',
    'google.com',
    null
  ),
  new Document(
    '5',
    'Batman & Robin',
    'Batman is awesome',
    'google.com',
    null
  )
];
  constructor() { }
onSelectedDocument(document: Document){
this.selectedDocumentEvent.emit(document);
}
  ngOnInit() {
  }

}
