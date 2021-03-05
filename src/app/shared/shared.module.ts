import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import { CountPipe } from './pipes/count.pipe';
import { TimerPipe } from './pipes/timer.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { BarComponent } from './components/bar/bar.component';
import { ConfigBankComponent } from './components/config-bank/config-bank.component';
import { QuestionsComponent } from './components/questions/questions.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [CountPipe, TimerPipe, PaginationComponent, LoaderComponent, ModalDeleteComponent, BarComponent, ConfigBankComponent, QuestionsComponent],
  exports: [CountPipe, TimerPipe, PaginationComponent, LoaderComponent, ModalDeleteComponent, BarComponent, ConfigBankComponent],
})
export class SharedModule {}
