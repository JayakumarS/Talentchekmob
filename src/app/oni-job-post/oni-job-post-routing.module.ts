import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OniJobPostPage } from './oni-job-post.page';

const routes: Routes = [
  {
    path: '',
    component: OniJobPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OniJobPostPageRoutingModule {}
