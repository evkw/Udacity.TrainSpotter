import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../shared/database/database.service';

import { Subscription } from 'rxjs/Subscription';
import * as Rx from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'app-loading',
    templateUrl: 'db-loading.component.html'
})
export class LoadingComponent implements OnInit, OnDestroy {

    public sub: Subscription;
    constructor(private dbSvc: DatabaseService, private router: Router) {
        if (navigator.onLine) {
            dbSvc.deleteDb();
            dbSvc.reloadDb();
        }
    }

    ngOnInit() {
        if (navigator.onLine) {
            this.sub = Rx.Observable.interval(1000)
                .subscribe(() => {
                    if (this.dbSvc.loadingStatus.allLoaded()) {
                        this.router.navigate(['timetable']);
                    }
                });
        } else {
            this.router.navigate(['timetable']);
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
