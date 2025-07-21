import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionInsorgPage } from './subscription-insorg.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionInsorgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionInsorgPageRoutingModule {}
