import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailVisibilityPage } from './email-visibility.page';

const routes: Routes = [
  {
    path: '',
    component: EmailVisibilityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailVisibilityPageRoutingModule {}
