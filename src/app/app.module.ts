import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActionItemsComponent } from './action-items/action-items.component';
import { TasksService } from './services/tasks.service';
import { DaysLeftToDeadlineService } from './services/days-left-to-deadline.service';
import { CircleColorPipe } from './pipes/circle-color.pipe';

@NgModule({
  declarations: [AppComponent, NavbarComponent, ActionItemsComponent, CircleColorPipe],
  imports: [BrowserModule, AppRoutingModule],
  providers: [TasksService, DaysLeftToDeadlineService],
  bootstrap: [AppComponent]
})
export class AppModule {}
