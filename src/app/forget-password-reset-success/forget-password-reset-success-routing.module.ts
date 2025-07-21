import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgetPasswordResetSuccessPage } from './forget-password-reset-success.page';

const routes: Routes = [
  {
    path: '',
    component: ForgetPasswordResetSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgetPasswordResetSuccessPageRoutingModule {}
