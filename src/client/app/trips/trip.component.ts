import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { db } from '../shared/database/db';
import { Routes } from '../shared/models/routes.model';
import { Trips } from '../shared/models/trips.model';
import { StopTimes } from '../shared/models/stop_times.model';
import { Stops } from '../shared/models/stops.model';

import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'app-trips',
    templateUrl: 'trip.component.html'
})

export class TripComponent {

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
    public arrive: Date;
    public depart: Date;
    public duration: string;

    constructor(private fb: FormBuilder) {
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
            this.depart = this.convertToTime(depart.stopTime.departure_time);
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

            let date = new Date(Date.now());
            if (stopId == null) {
                return;
            }

            let arrive = this.arriveStops.find(x => x.stopTime.stop_id == stopId);
            this.arriveTime = arrive;
            this.arrive = this.convertToTime(arrive.stopTime.arrival_time);


            this.setDuration(this.arrive, this.depart);
        });
    }


    convertToTime(time: string): Date {
        let date = new Date();
        let split = time.split(":");
        let hour: number = 0;

        if (+split[0] > 24) {
            hour = (+split[0] - 24)
        }

        this.arrive = new Date();
        date.setHours(hour);
        date.setMinutes(+split[1]);
        date.setSeconds(+split[2]);
        return date;
    }

    setDuration(arrive: Date, depart: Date) {
        var beginningTime = moment({
            h: depart.getHours(),
            m: depart.getMinutes(),
            s: depart.getSeconds()
        });
        var endTime = moment({
            h: arrive.getHours(),
            m: arrive.getMinutes(),
            s: arrive.getSeconds()
        });

        let diff = moment.duration(endTime.diff(beginningTime));
        this.duration = `${diff.hours()}h ${diff.minutes()}m  ${diff.seconds()}s`;
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
