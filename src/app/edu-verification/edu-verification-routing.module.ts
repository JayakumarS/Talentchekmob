import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EduVerificationPage } from './edu-verification.page';

const routes: Routes = [
  {
    path: '',
    component: EduVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EduVerificationPageRoutingModule {}
