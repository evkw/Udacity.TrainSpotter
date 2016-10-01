import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { db } from './db';
import { Agency } from '../models/agency.model';
import { Calendar } from '../models/calendar.model';
import { CalendarDates } from '../models/calendar_dates.model';
import { Routes } from '../models/routes.model';
import { Shapes } from '../models/shapes.model';
import { StopTimes } from '../models/stop_times.model';
import { Stops } from '../models/stops.model';
import { Trips } from '../models/trips.model';

@Injectable()
export class DatabaseService {

    loadingStatus: LoadingStatus = new LoadingStatus();

    constructor(private http: Http) { }

    deleteDb() {
        console.log('Deleting Database');
        db.delete();
        db.open();
    }

    reloadDb() {
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
                db.table('agencies').bulkAdd(agencies)
                    .then(() => {
                        console.log('Agencies added to database');
                        this.loadingStatus.agenciesLoaded = true;
                    });
            });
    }

    private getCalendarForDb() {
        this.http.get('../assets/transport-data/calendar.json')
            .map(res => <Calendar[]>res.json())
            .subscribe(calendar => {
                db.calendar.bulkAdd(calendar)
                    .then(() => {
                        console.log('Calendar added to database');
                        this.loadingStatus.calendarLoaded = true;
                    });
            });
    }

    private getCalendarDatesForDb() {
        this.http.get('../assets/transport-data/calendar_dates.json')
            .map(res => <CalendarDates[]>res.json())
            .subscribe(calendarDates => {
                db.calendarDates.bulkAdd(calendarDates)
                     .then(() => {
                        console.log('Calendar Dates added to database');
                        this.loadingStatus.calendarDatesLoaded = true;
                    });
            });
    }

    private getRoutesForDb() {
        this.http.get('../assets/transport-data/routes.json')
            .map(res => <Routes[]>res.json())
            .subscribe(routes => {
                db.routes.bulkAdd(routes)
                     .then(() => {
                        console.log('Routes added to database');
                        this.loadingStatus.routesLoaded = true;
                    });
            });
    }

    private getShapesForDb() {
        this.http.get('../assets/transport-data/shapes.json')
            .map(res => <Shapes[]>res.json())
            .subscribe(shapes => {
                db.shapes.bulkAdd(shapes)
                     .then(() => {
                        console.log('Shapes added to database');
                        this.loadingStatus.shapedLoaded = true;
                    });
            });
    }

    private getStopTimesForDb() {
        this.http.get('../assets/transport-data/stop_times.json')
            .map(res => <StopTimes[]>res.json())
            .subscribe(stopTimes => {
                db.stopTimes.bulkAdd(stopTimes)
                     .then(() => {
                        console.log('Stop Times added to database');
                        this.loadingStatus.stopTimesLoaded = true;
                    });
            });
    }

    private getStopsForDb() {
        this.http.get('../assets/transport-data/stops.json')
            .map(res => <Stops[]>res.json())
            .subscribe(stops => {
                db.stops.bulkAdd(stops)
                     .then(() => {
                        console.log('Stops added to database');
                        this.loadingStatus.stopsLoaded = true;
                    });
            });
    }

    private getTripsForDb() {
        this.http.get('../assets/transport-data/trips.json')
            .map(res => <Trips[]>res.json())
            .subscribe(trips => {
                db.trips.bulkAdd(trips)
                     .then(() => {
                        console.log('Trips added to database');
                        this.loadingStatus.tripsLoaded = true;
                    });
            });
    }
}


class LoadingStatus {
    agenciesLoaded: boolean;
    calendarLoaded: boolean;
    calendarDatesLoaded: boolean;
    routesLoaded: boolean;
    shapedLoaded: boolean;
    stopTimesLoaded: boolean;
    stopsLoaded: boolean;
    tripsLoaded: boolean;

    allLoaded() {
        return this.agenciesLoaded &&
            this.calendarLoaded &&
            this.calendarDatesLoaded &&
            this.routesLoaded &&
            this.shapedLoaded &&
            this.stopTimesLoaded &&
            this.stopsLoaded &&
            this.tripsLoaded;
    }
}