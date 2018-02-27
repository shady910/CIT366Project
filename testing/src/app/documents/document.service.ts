import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable()
export class DocumentService {
  documentListChangedEvent: Subject<Document[]> = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;
  @Output() documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId: number = 0;

    this.documents.forEach((document: Document) => {
      let currentId: number = Number(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.filter((document: Document) => {
      return document.id === id;
    })[0] || null;
  }

  addDocument(document: Document) {
    if (document) {
      document.id = String(++this.maxDocumentId);
      this.documents.push(document);
      this.documentListChangedEvent.next(this.getDocuments());
    }
  }

  updateDocument(original: Document, updated: Document) {
    let pos;
    if (original && updated && (pos = this.documents.indexOf(original)) >= 0) {
      updated.id = original.id;
      this.documents[pos] = updated;
      this.documentListChangedEvent.next(this.getDocuments());
    }
  }

  deleteDocument(document: Document) {
    let pos;
    if (document && (pos = this.documents.indexOf(document)) >= 0) {
      this.documents.splice(pos, 1);
      this.documentListChangedEvent.next(this.getDocuments());
    }
  }

}
