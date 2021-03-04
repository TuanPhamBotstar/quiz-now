import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarChartBankComponent } from './modules/bank/components/bar-chart-bank/bar-chart-bank.component';
import { CreateBankComponent } from './modules/bank/components/create-bank/create-bank.component';
import { DashboardComponent } from './modules/bank/components/dashboard/dashboard.component';
import { ViewBankDetailComponent } from './modules/bank/components/view-bank-detail/view-bank-detail.component';
import { ViewBankQuestionsComponent } from './modules/bank/components/view-bank-questions/view-bank-questions.component';
import { ViewBankComponent } from './modules/bank/components/view-bank/view-bank.component';
import { ViewQuestionDetailComponent } from './modules/bank/components/view-question-detail/view-question-detail.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { DetailResultComponent } from './modules/result/components/detail-result/detail-result.component';
import { ResultWithTestComponent } from './modules/result/components/result-with-test/result-with-test.component';
import { ResultWithUserDetailComponent } from './modules/result/components/result-with-user-detail/result-with-user-detail.component';
import { ResultWithUserComponent } from './modules/result/components/result-with-user/result-with-user.component';
import { ViewResultComponent } from './modules/result/components/view-result/view-result.component';
import { CreateTestComponent } from './modules/test/components/create-test/create-test.component';
import { DoTestComponent } from './modules/test/components/do-test/do-test.component';
import { HistoryComponent } from './modules/result/components/history/history.component';

const routes: Routes = [
  { path: '', redirectTo: 'bank/view', pathMatch: 'full' },
  {
    path: 'bank',
    loadChildren: () =>
      import('./modules/bank/bank.module').then((m) => m.BankModule),
  },
  {
    path: 'result',
    loadChildren: () => import('./modules/result/result.module').then((m) => m.ResultModule)
  },
  { path: 'test/access/:id', component: DoTestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
