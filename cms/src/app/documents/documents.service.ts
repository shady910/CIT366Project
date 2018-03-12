import { Injectable, Output, EventEmitter, OnDestroy, OnInit} from "@angular/core";
import {Document} from './document.model';
import { MOCKDOCUMENTS} from "./MOCKDOCUMENTS";
import { Subject } from 'rxjs/Subject';
import { Subscription} from "rxjs/Subscription";
import 'rxjs/Rx';
import { Http} from '@angular/http';
import { Response} from "@angular/http";

@Injectable()
export class DocumentsService implements OnDestroy, OnInit{
  documentListChangedEvent: Subject<Document[]> = new Subject<Document[]>();
  // initiate an empty documents array
  documents: Document[] = [];
  maxDocumentId: number;
  // bring subscription into scope
  subscription: Subscription;
  // get the URL to my firebase and store for repeated use
  jsonUrl: string = 'https://cit366cms.firebaseio.com/documents.json';

  @Output() documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  @Output() documentChangedEvent: EventEmitter<Document[]> = new EventEmitter<Document[]>();
  constructor(private http: Http, private documentsService: DocumentsService) {

    this.initDocuments();
    // delete what is in the constructor
    //this.documents = MOCKDOCUMENTS
    //this.maxDocumentId = this.getMaxId();
  }

  storeDocuments(){
    // put request overwrites data/ save the data
    this.http.put(this.jsonUrl, JSON.stringify((this.documents)));
    // below part is troublesome
      //.subscribe(() => {
      //  this.documentListChangedEvent.next(this.getDocuments())
     // }));
  }

  initDocuments(){
    // Base off of the getRecipes from the downloadable
    // first get
    this.http.get(this.jsonUrl)
      // use the map function
      .map((response: Response) => {
        const documents: Document[] = response.json();
        return documents;
      })
    // subscribe
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documentListChangedEvent.next(this.getDocuments());
      })
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
  // add Document
  addDocument(document: Document){
    if (document) {
      document.id = String(++this.maxDocumentId);

      this.documents.push(document);
      this.documentListChangedEvent.next(this.getDocuments());
    }
  }
  //update Document
  updateDocument(original: Document, updated: Document){
  var pos;
  if (original && updated && ( pos = this.documents.indexOf(original)) >= 0){
    updated.id = original.id;
    this.documents[pos] = updated;
    this.documentListChangedEvent.next(this.getDocuments());
  }
  }
// Do I delete this/???
  getDocuments(): Document[] {
    return this.documents.slice();
  }
  getDocument(id: string): Document {
    return this.documents.filter((document: Document) => {
      return document.id === id;
    })[0] || null;
  }
  deleteDocument(document: Document){
    if (document === null){
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0){
      return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.getDocuments());
  }
  ngOnInit(){
    this.subscription = this.documentListChangedEvent.subscribe();
  }
  ngOnDestroy(){
    this.documentListChangedEvent.unsubscribe();
  }
}
