import { Component, OnInit} from '@angular/core';
import {DocumentsService} from "../documents.service";
import { Document} from "../document.model";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService} from "../../win-ref.service";

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  nativeWindow: any;
  constructor(private documentsService: DocumentsService,
              private route: ActivatedRoute,
              private router: Router,
              private winRefService: WindRefService) {
    this.nativeWindow = this.winRefService.getNativeWindow();

  }

  ngOnInit() {
    // the edit button on the detail html
    this.route.params.subscribe((params: Params) => {
      this.document = this.documentsService.getDocument(params['id']);
    });
  }
// the view button on the detail html
  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }
// the delete button on the detail html
  onDelete() {
    this.documentsService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }


}
