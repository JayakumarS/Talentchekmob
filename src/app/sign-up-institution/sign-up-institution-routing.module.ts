import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpInstitutionPage } from './sign-up-institution.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpInstitutionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpInstitutionPageRoutingModule {}
