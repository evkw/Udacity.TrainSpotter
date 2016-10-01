import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { db } from './shared/database/db';
import { Agency } from './shared/models/agency.model';
import { Calendar } from './shared/models/calendar.model';
import { CalendarDates } from './shared/models/calendar_dates.model';
import { Routes } from './shared/models/routes.model';
import { Shapes } from './shared/models/shapes.model';
import { StopTimes } from './shared/models/stop_times.model';
import { Stops } from './shared/models/stops.model';
import { Trips } from './shared/models/trips.model';

import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

    constructor(private http: Http) { }

    reloadDb() {
        console.log('Deleting Database');
        db.delete();
        console.log('Re-openning Database');
        return db.open().then(() => {
            this.getAgenciesForDb();
            this.getCalendarForDb();
            this.getCalendarDatesForDb();
            this.getRoutesForDb();
            this.getShapesForDb();
            this.getStopTimesForDb();
            this.getStopsForDb();
            this.getTripsForDb();
        });
    }

    private getAgenciesForDb() {
        this.http.get('../assets/transport-data/agency.json')
            .map(res => <Agency[]>res.json())
            .subscribe(agencies => {
                db.agencies.bulkAdd(agencies)
                    .then(() => console.log('Agencies added to database'));
            });
    }

    private getCalendarForDb() {
        this.http.get('../assets/transport-data/calendar.json')
            .map(res => <Calendar[]>res.json())
            .subscribe(calendar => {
                db.calendar.bulkAdd(calendar)
                    .then(() => console.log('Calendar added to database'));
            });
    }

    private getCalendarDatesForDb() {
        this.http.get('../assets/transport-data/calendar_dates.json')
            .map(res => <CalendarDates[]>res.json())
            .subscribe(calendarDates => {
                db.calendarDates.bulkAdd(calendarDates)
                    .then(() => console.log('Calendar Dates added to database'));
            });
    }

    private getRoutesForDb() {
        this.http.get('../assets/transport-data/routes.json')
            .map(res => <Routes[]>res.json())
            .subscribe(routes => {
                db.routes.bulkAdd(routes)
                    .then(() => console.log('Routes added to database'));
            });
    }

    private getShapesForDb() {
        this.http.get('../assets/transport-data/shapes.json')
            .map(res => <Shapes[]>res.json())
            .subscribe(shapes => {
                db.shapes.bulkAdd(shapes)
                    .then(() => console.log('Shapes added to database'));
            });
    }

    private getStopTimesForDb() {
        this.http.get('../assets/transport-data/stop_times.json')
            .map(res => <StopTimes[]>res.json())
            .subscribe(stopTimes => {
                db.stopTimes.bulkAdd(stopTimes)
                    .then(() => console.log('Stop Times added to database'));
            });
    }

    private getStopsForDb() {
        this.http.get('../assets/transport-data/stops.json')
            .map(res => <Stops[]>res.json())
            .subscribe(stops => {
                db.stops.bulkAdd(stops)
                    .then(() => console.log('Stops added to database'));
            });
    }

    private getTripsForDb() {
        this.http.get('../assets/transport-data/trips.json')
            .map(res => <Trips[]>res.json())
            .subscribe(trips => {
                db.trips.bulkAdd(trips)
                    .then(() => console.log('Trips added to database'));
            });
    }
}
