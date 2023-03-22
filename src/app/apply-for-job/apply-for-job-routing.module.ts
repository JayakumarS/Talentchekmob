import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplyForJobPage } from './apply-for-job.page';

const routes: Routes = [
  {
    path: '',
    component: ApplyForJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplyForJobPageRoutingModule {}
