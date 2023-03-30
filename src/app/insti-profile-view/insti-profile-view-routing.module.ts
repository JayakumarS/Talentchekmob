import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstiProfileViewPage } from './insti-profile-view.page';

const routes: Routes = [
  {
    path: '',
    component: InstiProfileViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstiProfileViewPageRoutingModule {}
