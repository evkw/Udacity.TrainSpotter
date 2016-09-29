import { Component } from '@angular/core';
import Dexie from 'Dexie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  db: Dexie;

  constructor() {
    this.db = new Dexie('dsds');
    this.db.version(1).stores({contacts: 'id, first, last'});
    this.db.table('contacts').put({first:'Evan', last: 'Wallace'});

  }
}

interface IContact {
    id?: number,
    first: string,
    last: string
}