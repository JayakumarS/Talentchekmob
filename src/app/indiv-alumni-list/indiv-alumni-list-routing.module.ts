import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndivAlumniListPage } from './indiv-alumni-list.page';

const routes: Routes = [
  {
    path: '',
    component: IndivAlumniListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndivAlumniListPageRoutingModule {}
