import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EducationsPage } from './educations.page';

const routes: Routes = [
  {
    path: '',
    component: EducationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EducationsPageRoutingModule {}
