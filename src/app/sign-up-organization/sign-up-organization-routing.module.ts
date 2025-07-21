import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpOrganizationPage } from './sign-up-organization.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpOrganizationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpOrganizationPageRoutingModule {}
