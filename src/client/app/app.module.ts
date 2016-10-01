import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { DatabaseService } from './shared/database/database.service';
import { TripComponent } from './trips/trip.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule.forRoot(),
    FormsModule,
    ReactiveFormsModule],
  declarations: [AppComponent, TripComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  },
    DatabaseService],
  bootstrap: [AppComponent]

})

export class AppModule { }
