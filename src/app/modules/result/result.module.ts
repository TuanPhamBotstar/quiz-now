import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ChartsModule } from 'ng2-charts';
import {TestModule} from 'src/app/modules/test/test.module';

import {RouterModule} from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';

import { ViewResultComponent } from './components/view-result/view-result.component';
import { ResultComponent } from './components/result/result.component';
import { DetailResultComponent } from './components/detail-result/detail-result.component';
import { ResultWithTestComponent } from './components/result-with-test/result-with-test.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';



@NgModule({
  declarations: [ViewResultComponent, ResultComponent, DetailResultComponent, ResultWithTestComponent, BarChartComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ChartsModule,
    TestModule,
    RouterModule,
    ClipboardModule
  ]
})
export class ResultModule { }
