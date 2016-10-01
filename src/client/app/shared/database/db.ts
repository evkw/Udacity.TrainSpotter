import { Agency } from '../models/agency.model';
import { Calendar } from '../models/calendar.model';
import { CalendarDates } from '../models/calendar_dates.model';
import { Routes } from '../models/routes.model';
import { Shapes } from '../models/shapes.model';
import { StopTimes } from '../models/stop_times.model';
import { Stops } from '../models/stops.model';
import { Trips } from '../models/trips.model';

import Dexie from 'dexie';

export class AppDb extends Dexie {
    agencies: Dexie.Table<Agency, number>;
    calendar: Dexie.Table<Calendar, number>;
    calendarDates: Dexie.Table<CalendarDates, number>;
    routes: Dexie.Table<Routes, string>;
    shapes: Dexie.Table<Shapes, number>;
    stopTimes: Dexie.Table<StopTimes, number>;
    stops: Dexie.Table<Stops, number>;
    trips: Dexie.Table<Trips, number>;


    constructor() {
        super('AppDb');
        this.version(1).stores({
            agencies: 'agency_id, agency_name, agency_url, agency_timezone, agency_lang, agency_phone',
            calendar: 'service_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday, start_date, end_date',
            calendarDates: 'id++, service_id, date, exception_type',
            routes: 'route_id, agency_id, route_short_name, route_long_name, route_desc, route_type, route_color, route_text_color',
            shapes: 'id++, shape_id, shape_pt_lat, shape_pt_lon, shape_pt_sequence, shape_dist_traveled',
            stopTimes: 'id++, stop_id, trip_id, arrival_time, departure_time, stop_sequence, stop_headsign, pickup_type, drop_off_type, shape_dist_traveled, timepoint, stop_note',
            stops: 'stop_id, stop_name, stop_lat, stop_lon, location_type, parent_station, wheelchair_boarding',
            trips: 'trip_id, service_id, route_id, shape_id, trip_headsign, direction_id, block_id, wheelchair_accessible, trip_note, route_direction'
        });
    }

    deleteDb() {
        this.delete();
    }

    newDb() {
        return new AppDb();
    }
}

export var db = new AppDb();
