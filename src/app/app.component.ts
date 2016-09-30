import { Component } from '@angular/core';


import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private appSvc: AppService) {
    if (navigator.onLine) {
      this.appSvc.deleteDb();
      this.appSvc.loadDb();
    }
  }

  seedDatabase() { }
}
