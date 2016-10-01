export class StopTimes {
    id?: number;
    trip_id: number;
    arrival_time: string;
    departure_time: string;
    stop_id: number;
    stop_sequence: number;
    stop_headsign: string;
    pickup_type: number;
    drop_off_type: number;
    shape_dist_traveled: number;
    timepoint: number;
    stop_note: string;
}
