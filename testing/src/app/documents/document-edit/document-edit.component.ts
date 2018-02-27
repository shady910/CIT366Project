import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: [
    './document-edit.component.css'
  ]
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f') documentForm: NgForm;
  document: Document;
  original: Document;
  editMode: boolean = false;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.original = this.documentService.getDocument(params['id']);
      if (this.original) {
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.original));
      }
    });
  }

  onSubmit(form: NgForm) {
    const document: Document = new Document(String(this.documentService.getMaxId()),
      form.value.documentTitle, form.value.documentDescription,
      form.value.documentUrl, null);

    if (this.editMode) {
      this.documentService.updateDocument(this.original, document);
    } else {
      this.documentService.addDocument(document);
    }

    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
