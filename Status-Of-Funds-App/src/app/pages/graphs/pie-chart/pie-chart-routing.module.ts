import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PieChartPage } from './pie-chart.page';

const routes: Routes = [
  {
    path: '',
    component: PieChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PieChartPageRoutingModule {}
