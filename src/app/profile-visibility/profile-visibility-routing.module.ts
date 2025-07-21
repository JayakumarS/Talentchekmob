import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileVisibilityPage } from './profile-visibility.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileVisibilityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileVisibilityPageRoutingModule {}
