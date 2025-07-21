import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdditionalInfooPage } from './additional-infoo.page';

const routes: Routes = [
  {
    path: '',
    component: AdditionalInfooPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionalInfooPageRoutingModule {}
