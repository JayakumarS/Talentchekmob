import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingOrgPopupPage } from './rating-org-popup.page';

const routes: Routes = [
  {
    path: '',
    component: RatingOrgPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingOrgPopupPageRoutingModule {}
