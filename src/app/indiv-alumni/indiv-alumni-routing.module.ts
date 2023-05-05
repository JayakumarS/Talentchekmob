import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndivAlumniPage } from './indiv-alumni.page';

const routes: Routes = [
  {
    path: '',
    component: IndivAlumniPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndivAlumniPageRoutingModule {}
