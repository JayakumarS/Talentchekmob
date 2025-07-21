import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserSignupPage } from './user-signup.page';

const routes: Routes = [
  {
    path: '',
    component: UserSignupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSignupPageRoutingModule {}
