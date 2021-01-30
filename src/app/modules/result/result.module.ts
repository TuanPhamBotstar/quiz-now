import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';

import { ViewResultComponent } from './components/view-result/view-result.component';
import { ResultComponent } from './components/result/result.component';



@NgModule({
  declarations: [ViewResultComponent, ResultComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ]
})
export class ResultModule { }
