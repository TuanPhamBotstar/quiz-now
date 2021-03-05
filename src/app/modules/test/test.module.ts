import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTestComponent } from './components/create-test/create-test.component';

import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from 'src/app/core/core.module';
import { ViewTestComponent } from './components/view-test/view-test.component';
import { DoTestComponent } from './components/do-test/do-test.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { NpnSliderModule } from "npn-slider";
import {RouterModule} from '@angular/router';

import { TimerComponent } from './components/timer/timer.component';
import { FinishTestComponent } from './components/finish-test/finish-test.component';
import { ModalRequireComponent } from './components/modal-require/modal-require.component';
import { TestResultBarChartComponent } from './components/test-result-bar-chart/test-result-bar-chart.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { ViewTestQuestionsComponent } from './components/view-test-questions/view-test-questions.component';
import { ResultModule } from '../result/result.module';

@NgModule({
  declarations: [CreateTestComponent, ViewTestComponent, DoTestComponent, TimerComponent, FinishTestComponent, ModalRequireComponent, TestResultBarChartComponent, ModalConfirmComponent, ViewTestQuestionsComponent],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    SharedModule,
    ChartsModule,
    NpnSliderModule,
    RouterModule,
  ],
  exports: [CreateTestComponent, TestResultBarChartComponent]
})
export class TestModule { }
