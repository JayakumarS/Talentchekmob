import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationDashboardPage } from './organization-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationDashboardPageRoutingModule {}
