import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileVcardPage } from './profile-vcard.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileVcardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileVcardPageRoutingModule {}
