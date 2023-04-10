import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OniViewJobProfileMatchesListPage } from './oni-view-job-profile-matches-list.page';

const routes: Routes = [
  {
    path: '',
    component: OniViewJobProfileMatchesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OniViewJobProfileMatchesListPageRoutingModule {}
