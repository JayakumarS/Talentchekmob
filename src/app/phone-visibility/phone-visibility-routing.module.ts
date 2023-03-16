import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneVisibilityPage } from './phone-visibility.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneVisibilityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneVisibilityPageRoutingModule {}
