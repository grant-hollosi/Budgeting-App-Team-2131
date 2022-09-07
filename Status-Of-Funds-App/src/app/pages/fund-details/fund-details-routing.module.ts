import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundDetailsPage } from './fund-details.page';

const routes: Routes = [
  {
    path: '',
    component: FundDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundDetailsPageRoutingModule {}
