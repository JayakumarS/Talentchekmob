import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstitutionDashboardPage } from './institution-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: InstitutionDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionDashboardPageRoutingModule {}
