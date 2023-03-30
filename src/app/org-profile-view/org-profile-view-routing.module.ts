import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrgProfileViewPage } from './org-profile-view.page';

const routes: Routes = [
  {
    path: '',
    component: OrgProfileViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgProfileViewPageRoutingModule {}
