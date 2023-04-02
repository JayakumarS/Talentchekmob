import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationDashboardListPage } from './organization-dashboard-list.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationDashboardListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationDashboardListPageRoutingModule {}
