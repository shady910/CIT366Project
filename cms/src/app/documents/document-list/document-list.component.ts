import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Document } from '../document.model';
import {DocumentsService} from "../documents.service";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {


@Input() documents: Document[] = [];
  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    this.documents = this.documentsService.getDocuments();
  }

  onSelectedDocument(document: Document){
    this.documentsService.documentSelectedEvent.emit(document);
  }


}
