import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountPipe } from './pipes/count.pipe';
import { TimerPipe } from './pipes/timer.pipe';

@NgModule({
  declarations: [CountPipe, TimerPipe],
  exports: [CountPipe, TimerPipe],
})
export class SharedModule {}
