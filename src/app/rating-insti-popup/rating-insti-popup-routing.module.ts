import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingInstiPopupPage } from './rating-insti-popup.page';

const routes: Routes = [
  {
    path: '',
    component: RatingInstiPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingInstiPopupPageRoutingModule {}
