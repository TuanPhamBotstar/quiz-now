import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultWithTestComponent } from '../result/components/result-with-test/result-with-test.component';
import { ResultWithUserDetailComponent } from '../result/components/result-with-user-detail/result-with-user-detail.component';
import { ResultWithUserComponent } from '../result/components/result-with-user/result-with-user.component';
import { CreateTestComponent } from '../test/components/create-test/create-test.component';
import { CreateBankComponent } from './components/create-bank/create-bank.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewBankDetailComponent } from './components/view-bank-detail/view-bank-detail.component';
import { ViewBankQuestionsComponent } from './components/view-bank-questions/view-bank-questions.component';
import { ViewBankComponent } from './components/view-bank/view-bank.component';
import { ViewQuestionDetailComponent } from './components/view-question-detail/view-question-detail.component';
import { ConfigBankComponent } from './components/config-bank/config-bank.component';
import { ViewTestQuestionsComponent } from '../test/components/view-test-questions/view-test-questions.component';

const routes: Routes = [
  {
    path: 'config/:id',
    component: ConfigBankComponent,
  },
  {
    path: 'view',
    component: ViewBankComponent,
  },
  {
    path: 'create',
    component: CreateBankComponent,
  },
  {
    path: 'view/:id/tests',
    component: ViewBankDetailComponent,
  },
  {
    path: 'view/:id/create/test',
    component: CreateTestComponent,
  },
  {
    path: 'view/:id/questions',
    component: ViewBankQuestionsComponent,
  },
  {
    path: 'view/:idBank/tests/:id',
    component: ResultWithTestComponent,
  },
  {
    path: 'view/:idBank/tests/:id/questions',
    component: ViewTestQuestionsComponent,
  },
  {
    path: 'question/:id',
    component: ViewQuestionDetailComponent,
  },
  {
    path: 'view/:id/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'view/:idBank/test/:idTest/detail',
    component: ResultWithUserComponent,
  },
  {
    path: 'view/:idBank/test/:idTest/detail/:idUser',
    component: ResultWithUserDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankRoutingModule {}
