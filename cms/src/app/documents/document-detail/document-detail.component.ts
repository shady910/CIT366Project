import { Component, OnInit} from '@angular/core';
import {DocumentsService} from "../documents.service";
import { Document} from "../document.model";
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;

  constructor(private documentsService: DocumentsService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.document = this.documentsService.getDocument(params['id']);
    });
  }

}
