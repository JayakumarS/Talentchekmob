import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcademicVerifierDetailsPage } from './academic-verifier-details.page';

const routes: Routes = [
  {
    path: '',
    component: AcademicVerifierDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcademicVerifierDetailsPageRoutingModule {}
