import { Injectable, Output, EventEmitter} from "@angular/core";
import {Document} from './document.model';
import { MOCKDOCUMENTS} from "./MOCKDOCUMENTS";

@Injectable()
export class DocumentsService{
  documents: Document[] = [];
  @Output() documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }
  getDocument(id: string): Document {
    return this.documents.filter((document: Document) => {
      return document.id === id;
    })[0] || null;
  }
}
