import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from './app.service';

import { db } from './shared/database/db';
import { Routes } from './shared/models/routes.model';
import { Trips } from './shared/models/trips.model';
import { StopTimes } from './shared/models/stop_times.model';
import { Stops } from './shared/models/stops.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public transportForm: FormGroup;
  public routes: Routes[] = [];
  public trips: Trips[] = [];
  public stopTimes: StopTimes[] = [];
  public stops: Stops[] = [];
  public departureTimes: StopTimes[] = [];
  public arriveStops: ExpandedStop[] = [];
  public expandedStops: ExpandedStop[] = [];
  public departTime: ExpandedStop;
  public arriveTime: ExpandedStop;
  public expandedTrips: ExpandedTrip[] = [];

  constructor(
    private appSvc: AppService,
    private fb: FormBuilder) {

    // Do database logic
    if (navigator.onLine) {

      db.routes.toArray()
        .then(res => {
          this.routes = res;
        });

      db.stops.toArray()
        .then(res => {
          this.stops = res;
        });

      db.stopTimes.toArray()
        .then(res => {
          this.stopTimes = res;
        });
      // this.appSvc.reloadDb()
      //   .then(() => {
      //     db.routes.toArray()
      //       .then(res => {
      //         this.routes = res;
      //       });

      //     db.stops.toArray()
      //       .then(res => {
      //         this.stops = res;
      //       });
      //   });

    } else {
      db.routes.toArray()
        .then(res => {
          this.routes = res;
        });

      db.stops.toArray()
        .then(res => {
          this.stops = res;
        });
    }

    this.transportForm = fb.group({
      route: [''],
      trip: [''],
      depart: [''],
      arrive: ['']
    });

    this.transportForm.controls['route'].valueChanges.subscribe(routeid => {
      this.expandedTrips = [];

      this.transportForm.controls['arrive'].reset();
      this.transportForm.controls['depart'].reset();

      this.arriveTime = new ExpandedStop();
      this.departTime = new ExpandedStop();
      db.trips
        .where('route_id').equals(routeid)
        .toArray(res => {
          this.trips = res;
          this.trips.forEach(trip => {
            let et = new ExpandedTrip;
            et.trip = trip;
            et.firstStop = this.stopTimes.find(x => x.trip_id == trip.trip_id);
            this.expandedTrips.push(et);
          });
        });
    });

    this.transportForm.controls['trip'].valueChanges.subscribe(tripId => {
      this.expandedStops = [];
      db.stopTimes
        .where('trip_id')
        .equals(+tripId)
        .toArray(res => {
          res.forEach(stopTime => {
            let est = new ExpandedStop;
            est.stopTime = stopTime;
            est.stop = this.stops.find(x => x.stop_id == stopTime.stop_id);
            this.expandedStops.push(est);
          });
        });
    });

    this.transportForm.controls['depart'].valueChanges.subscribe(stopId => {

      if (stopId == null) {
        return;
      }

      let depart = this.expandedStops.find(x => x.stop.stop_id == stopId);
      this.departTime = depart;
      this.transportForm.controls['arrive'].reset();
      let stops = this.expandedStops;
      this.arriveStops = [];
      stops.forEach(x => {
        if (x.stopTime.stop_sequence > depart.stopTime.stop_sequence) {
          this.arriveStops.push(x);
        }
      });
    });

    this.transportForm.controls['arrive'].valueChanges.subscribe(stopId => {

      if (stopId == null) {
        return;
      }

      let arrive = this.arriveStops.find(x => x.stopTime.stop_id == stopId);
      this.arriveTime = arrive;
    });
  }
}

class ExpandedStop {
  stopTime: StopTimes;
  stop: Stops;
}

class ExpandedTrip {
  firstStop: StopTimes;
  trip: Trips;
}
