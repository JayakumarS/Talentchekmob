import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrgProfilePage } from './org-profile.page';

const routes: Routes = [
  {
    path: '',
    component: OrgProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrgProfilePageRoutingModule {}
