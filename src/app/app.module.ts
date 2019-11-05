
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstDummyComponent } from './first-dummy/first-dummy.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActionItemsComponent } from './action-items/action-items.component';
import {MatTableModule} from '@angular/material/table';
import { DataTableModule } from 'ng-angular8-datatable';
import { TasksService } from './tasks.service';




@NgModule({
  declarations: [
    AppComponent,
    FirstDummyComponent,
    NavbarComponent,
    ActionItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    DataTableModule
    
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
