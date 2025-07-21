import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OniJobPostListPage } from './oni-job-post-list.page';

const routes: Routes = [
  {
    path: '',
    component: OniJobPostListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OniJobPostListPageRoutingModule {}
