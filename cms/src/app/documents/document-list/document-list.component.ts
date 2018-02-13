import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Document } from '../document.model';
import {DocumentsService} from "../documents.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
subscription: Subscription;

@Input() documents: Document[] = [];
  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    this.documents = this.documentsService.getDocuments();
    this.documentsService.documentListChangedEvent.subscribe((documents: Document[])  => {
      this.documents = documents;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
