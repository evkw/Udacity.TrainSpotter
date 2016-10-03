import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { DatabaseService } from './shared/database/database.service';
import { TripComponent } from './trips/trip.component';
import { TimetableComponent } from './timetable/timetable.component';
import { LoadingComponent } from './db-loading/db-loading.component';
import { routes } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)],
  declarations: [
    AppComponent,
    TripComponent,
    TimetableComponent,
    LoadingComponent
  ],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  },
    DatabaseService],
  bootstrap: [AppComponent]

})

export class AppModule { }
