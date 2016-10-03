import { Component } from '@angular/core';

import { db } from '../shared/database/db';
import { Routes } from '../shared/models/routes.model';
import { Trips } from '../shared/models/trips.model';
import { StopTimes } from '../shared/models/stop_times.model';
import { Stops } from '../shared/models/stops.model';

@Component({
    moduleId: module.id,
    selector: 'app-timetable',
    templateUrl: 'timetable.component.html'
})
export class TimetableComponent {

    public timetable: Timetable[] = [];
    public stops: Stops[] = [];
    public routes: Routes[] = [];
    public trips: Trips[] = [];
    constructor() {

        db.stops.toArray(res => {
            this.stops = res;
        }).then(() => {
            db.routes.toArray(res => {
                this.routes = res;
            }).then(() => {
                db.trips.toArray(res => {
                    this.trips = res;
                }).then(() => {
                    db.stopTimes
                        .toArray(res => {
                            res.forEach(stopTime => {
                                let tt = new Timetable();
                                let est = new ExpandedStop;
                                est.stopTime = stopTime;
                                est.stop = this.stops.find(x => x.stop_id == stopTime.stop_id);
                                tt.expandedStops = est;
                                tt.trip = this.trips.find(x => x.trip_id == stopTime.trip_id);
                                tt.route = this.routes.find(x => x.route_id == tt.trip.route_id);
                                this.timetable.push(tt);
                            });
                        });
                });
            });
        });
    }
}

class Timetable {
    route: Routes;
    trip: Trips;
    expandedStops: ExpandedStop;

}

class ExpandedStop {
    stopTime: StopTimes;
    stop: Stops;
}