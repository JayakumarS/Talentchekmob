import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionIndividualPage } from './subscription-individual.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionIndividualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionIndividualPageRoutingModule {}
