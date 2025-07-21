import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobSearchPage } from './job-search.page';

const routes: Routes = [
  {
    path: '',
    component: JobSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobSearchPageRoutingModule {}
