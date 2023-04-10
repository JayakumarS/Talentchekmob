import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BidsAndAplicationsRecivedPopupPage } from './bids-and-aplications-recived-popup.page';

const routes: Routes = [
  {
    path: '',
    component: BidsAndAplicationsRecivedPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BidsAndAplicationsRecivedPopupPageRoutingModule {}
