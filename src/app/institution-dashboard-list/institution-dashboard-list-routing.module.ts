import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstitutionDashboardListPage } from './institution-dashboard-list.page';

const routes: Routes = [
  {
    path: '',
    component: InstitutionDashboardListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionDashboardListPageRoutingModule {}
