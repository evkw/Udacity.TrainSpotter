import { Routes } from '@angular/router';

import { TripComponent } from './trips/trip.component';
import { TimetableComponent } from './timetable/timetable.component';
import { LoadingComponent } from './db-loading/db-loading.component';

export const routes: Routes = [
    {
        path: '',
        component: LoadingComponent
    },
    {
        path: 'timetable',
        component: TimetableComponent
    },
    {
        path: 'trip',
        component: TripComponent
    }
];
