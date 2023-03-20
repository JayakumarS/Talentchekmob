import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkExperiencesPage } from './work-experiences.page';

const routes: Routes = [
  {
    path: '',
    component: WorkExperiencesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkExperiencesPageRoutingModule {}
