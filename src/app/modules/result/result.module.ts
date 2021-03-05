import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ChartsModule } from 'ng2-charts';
import { TestModule } from 'src/app/modules/test/test.module';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';
import { ResultRoutingModule } from './result-routing.module';

import { ViewResultComponent } from './components/view-result/view-result.component';
import { ResultComponent } from './components/result/result.component';
import { DetailResultComponent } from './components/detail-result/detail-result.component';
import { ResultWithTestComponent } from './components/result-with-test/result-with-test.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { PieChartOverviewComponent } from './components/pie-chart-overview/pie-chart-overview.component';
import { ResultWithUserComponent } from './components/result-with-user/result-with-user.component';
import { ResultWithUserDetailComponent } from './components/result-with-user-detail/result-with-user-detail.component';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  declarations: [
    ViewResultComponent,
    ResultComponent,
    DetailResultComponent,
    ResultWithTestComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    PieChartOverviewComponent,
    ResultWithUserComponent,
    ResultWithUserDetailComponent,
    HistoryComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ChartsModule,
    TestModule,
    RouterModule,
    ClipboardModule,
    ResultRoutingModule,
  ],
  exports: [
    ResultWithUserDetailComponent
  ]
})
export class ResultModule {}
