import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { CountPipe } from './pipes/count.pipe';
import { TimerPipe } from './pipes/timer.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CountPipe, TimerPipe, PaginationComponent, LoaderComponent],
  exports: [CountPipe, TimerPipe, PaginationComponent, LoaderComponent],
})
export class SharedModule {}
