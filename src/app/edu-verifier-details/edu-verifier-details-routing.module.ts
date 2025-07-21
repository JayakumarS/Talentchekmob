import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EduVerifierDetailsPage } from './edu-verifier-details.page';

const routes: Routes = [
  {
    path: '',
    component: EduVerifierDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EduVerifierDetailsPageRoutingModule {}
