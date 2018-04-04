import { Injectable, Output, EventEmitter, OnDestroy, OnInit} from "@angular/core";
import {Document} from './document.model';

import { Subject } from 'rxjs/Subject';
import { Subscription} from "rxjs/Subscription";
import 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class DocumentsService implements OnDestroy, OnInit{
  documentListChangedEvent: Subject<Document[]> = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;
  // bring subscription into scope
  subscription: Subscription;
  // get the URL external database, whether it be mongo or firebase
  jsonUrl: string = 'http://localhost:3000/dir/documents';

  @Output() documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
   documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();
  constructor(private http: Http ) {

    this.initDocuments();
    //this.documents = MOCKDOCUMENTS

  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }
  getDocument(id: string): Document {
    return this.documents.filter((document: Document) => {
      return document.id === id;
    })[0] || null;
  }

  // get Max id
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

  storeDocuments(){
    // put request overwrites data
    this.http.put(this.jsonUrl, JSON.stringify(this.documents))
      .subscribe(() => {
        this.documentListChangedEvent.next(this.getDocuments());
      });
  }

  initDocuments(){
    // Base off of the getRecipes from the downloadable
    // first get
    this.http.get(this.jsonUrl)
      // use the map function
      .map((response: Response) => {
        const documents: Document[] = response.json().obj;
        return documents;
      })
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documentListChangedEvent.next(this.getDocuments());
    })
  }

  // add Document- partially works, except that the url is not stored. WORKS!
  addDocument(document: Document) {
    if(!document) {
      return;
    }

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    document.id = '';
    const strDocument = JSON.stringify(document);

    this.http.post('http://localhost:3000/dir/documents', strDocument, {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (document: Document) => {
          this.documents.push(document);
          this.documentChangedEvent.next(this.documents.slice());
        }
      )
  }
  //update the document, does not work. WORKS, especially after updating it according to assignment 9 instructions
  updateDocument(originalDocument: Document, newDocument: Document) {
    if(!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if(pos < 0) { // original document not in list
      return;
    }

    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const strDocument = JSON.stringify(newDocument);

    this.http.patch('http://localhost:3000/dir/documents/' + originalDocument.id, strDocument, {headers: headers})
      .map(
        (response: Response) => {
          return response.json().obj;
        })
      .subscribe(
        (document: Document) => {
          this.documents[pos] = document;
          this.documentChangedEvent.next(this.documents.slice());
        });
  }
// delete the document- works-> updated according to assignment 9 instructions
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if(pos < 0) { // original document not in list
      return;
    }

    this.http.delete('http://localhost:3000/dir/documents/' + document.id)
      .map(
        (response: Response) => {
          return response.json();
        })
      .subscribe(
        (json) => {
          if(json.title == 'Document deleted') {
            this.documents.splice(pos, 1);

            this.documentChangedEvent.next(this.documents.slice());
          }
        });
  }


  ngOnInit(){
    this.subscription = this.documentListChangedEvent.subscribe();
  }
  ngOnDestroy(){
    this.documentListChangedEvent.unsubscribe();
  }
}
