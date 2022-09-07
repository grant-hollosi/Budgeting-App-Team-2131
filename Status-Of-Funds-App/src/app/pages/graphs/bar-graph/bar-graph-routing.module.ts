import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarGraphPage } from './bar-graph.page';

const routes: Routes = [
  {
    path: '',
    component: BarGraphPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarGraphPageRoutingModule {}
