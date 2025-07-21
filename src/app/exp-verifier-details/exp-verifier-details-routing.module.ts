import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpVerifierDetailsPage } from './exp-verifier-details.page';

const routes: Routes = [
  {
    path: '',
    component: ExpVerifierDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpVerifierDetailsPageRoutingModule {}
