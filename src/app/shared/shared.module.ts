import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountPipe } from './pipes/count.pipe';

@NgModule({
  declarations: [CountPipe],
  exports: [CountPipe],
})
export class SharedModule {}
