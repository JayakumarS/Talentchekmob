import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardIndividualPage } from './dashboard-individual.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardIndividualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardIndividualPageRoutingModule {}
