import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OniAlumniListPage } from './oni-alumni-list.page';

const routes: Routes = [
  {
    path: '',
    component: OniAlumniListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OniAlumniListPageRoutingModule {}
