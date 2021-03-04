import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { ClickOutsideModule } from 'ng-click-outside';

import { CreateBankComponent } from './components/create-bank/create-bank.component';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { ViewBankComponent } from './components/view-bank/view-bank.component';

import { SharedModule } from '../../shared/shared.module';
import { ViewBankDetailComponent } from './components/view-bank-detail/view-bank-detail.component';
import { ClipboardModule } from 'ngx-clipboard';
import { ViewBankQuestionsComponent } from './components/view-bank-questions/view-bank-questions.component';
import { ViewQuestionDetailComponent } from './components/view-question-detail/view-question-detail.component';
import { DeleteBankComponent } from './components/delete-bank/delete-bank.component';
import { SearchBankComponent } from './components/search-bank/search-bank.component';
import { BarChartBankComponent } from './components/bar-chart-bank/bar-chart-bank.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchQuestionComponent } from './components/search-question/search-question.component';

import {BankRoutingModule} from './bank-routing.module';
import { ConfigBankComponent } from './components/config-bank/config-bank.component';

@NgModule({
  declarations: [
    CreateBankComponent,
    CreateQuestionComponent,
    ViewBankComponent,
    ViewBankDetailComponent,
    ViewBankQuestionsComponent,
    ViewQuestionDetailComponent,
    DeleteBankComponent,
    SearchBankComponent,
    BarChartBankComponent,
    DashboardComponent,
    SearchQuestionComponent,
    ConfigBankComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    SharedModule,
    ClipboardModule,
    RouterModule,
    ChartsModule,
    ClickOutsideModule,
    BankRoutingModule
  ],
  exports: [],
})
export class BankModule {}
