import { Component, OnInit } from '@angular/core';
import { Document} from "../document.model";
import {DocumentsService} from "../documents.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  document: Document;
  original: Document;
  editMode: boolean = false;

  constructor(private documentsService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)  => {this.original = this.documentsService.getDocument(params['id']);
    if (this.original) {
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.original));
    }
    });
  }

  onSubmit(form: NgForm){
      const document: Document = new Document(String(this.documentsService.getMaxId()),
        form.value.title, form.value.description, form.value.url, null);


      if (this.editMode) {
        this.documentsService.updateDocument(this.original, document);
      }
        else {
          this.documentsService.addDocument(document);
        }
        this.router.navigate(['/documents']);
      }

      onCancel() {
    this.router.navigate(['/documents']);
      }


}
