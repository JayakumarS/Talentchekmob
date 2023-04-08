import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityVerificationPage } from './activity-verification.page';

const routes: Routes = [
  {
    path: '',
    component: ActivityVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityVerificationPageRoutingModule {}
