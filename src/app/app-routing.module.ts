import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBankComponent } from './modules/bank/components/create-bank/create-bank.component';
import { ViewBankDetailComponent } from './modules/bank/components/view-bank-detail/view-bank-detail.component';
import { ViewBankQuestionsComponent } from './modules/bank/components/view-bank-questions/view-bank-questions.component';
import { ViewBankComponent } from './modules/bank/components/view-bank/view-bank.component';
import { ViewQuestionDetailComponent } from './modules/bank/components/view-question-detail/view-question-detail.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { ViewResultComponent } from './modules/result/components/view-result/view-result.component';
import { CreateTestComponent } from './modules/test/components/create-test/create-test.component';
import { DoTestComponent } from './modules/test/components/do-test/do-test.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'bank/create', component: CreateBankComponent},
  {path: 'bank/view', component: ViewBankComponent},
  {path: 'bank/view/:id', component: ViewBankDetailComponent},
  {path: 'bank/view/:id/create/test', component: CreateTestComponent},
  {path: 'bank/view/:id/questions', component: ViewBankQuestionsComponent},
  {path: 'bank/question/:id', component: ViewQuestionDetailComponent},
  {path: 'test/access/:id', component: DoTestComponent},
  {path: 'result', component: ViewResultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
