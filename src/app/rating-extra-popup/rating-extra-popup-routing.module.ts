import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingExtraPopupPage } from './rating-extra-popup.page';

const routes: Routes = [
  {
    path: '',
    component: RatingExtraPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingExtraPopupPageRoutingModule {}
