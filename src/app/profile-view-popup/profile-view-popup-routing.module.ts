import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileViewPopupPage } from './profile-view-popup.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileViewPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileViewPopupPageRoutingModule {}
