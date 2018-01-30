import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFeature: string;
  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }

}
