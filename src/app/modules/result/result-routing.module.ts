import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailResultComponent } from './components/detail-result/detail-result.component';
import { HistoryComponent } from './components/history/history.component';
import { ViewResultComponent } from './components/view-result/view-result.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: ViewResultComponent
    },
    {
        path: 'history',
        component: HistoryComponent
    },
    {
        path: ':id',
        component: DetailResultComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ResultRoutingModule {}