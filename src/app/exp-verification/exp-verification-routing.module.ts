import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpVerificationPage } from './exp-verification.page';

const routes: Routes = [
  {
    path: '',
    component: ExpVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpVerificationPageRoutingModule {}
