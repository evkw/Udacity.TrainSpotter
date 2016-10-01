import { Component, OnInit, OnDestroy } from '@angular/core';
import { Config } from './shared/index';
import './operators';
import { DatabaseService } from './shared/database/database.service';
import { Subscription } from 'rxjs/Subscription';
import * as Rx from 'rxjs/Rx';
import * as Dexie from 'dexie';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  templateUrl: 'app.component.html',
})

export class AppComponent implements OnInit, OnDestroy {

  public loadingComplete: boolean;
  public observer: Subscription;

  constructor(private dbSvs: DatabaseService) {
    console.log('Environment config', Config);
    if (navigator.onLine) {

      dbSvs.deleteDb();
      dbSvs.reloadDb();
    }
  }

  ngOnInit() {
    if(navigator.onLine) {
    this.observer = Rx.Observable.interval(1000)
      .subscribe(() => {
        this.loadingComplete = this.dbSvs.loadingStatus.allLoaded();
      });
    } else {
      this.loadingComplete = true;
    }
  }

  ngOnDestroy() {
    this.observer.unsubscribe();
  }
}
