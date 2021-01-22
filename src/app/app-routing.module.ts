import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateBankComponent } from './modules/bank/components/create-bank/create-bank.component';
import { ViewBankDetailComponent } from './modules/bank/components/view-bank-detail/view-bank-detail.component';
import { ViewBankComponent } from './modules/bank/components/view-bank/view-bank.component';
import { CreateTestComponent } from './modules/test/components/create-test/create-test.component';
import { DoTestComponent } from './modules/test/components/do-test/do-test.component';

const routes: Routes = [
  {path: 'bank/create', component: CreateBankComponent},
  {path: 'bank/view', component: ViewBankComponent},
  {path: 'bank/view/:id', component: ViewBankDetailComponent},
  {path: 'bank/view/:id/create/test', component: CreateTestComponent},
  {path: 'test/access/:id', component: DoTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
