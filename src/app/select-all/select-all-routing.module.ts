import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectAllPage } from './select-all.page';

const routes: Routes = [
  {
    path: '',
    component: SelectAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectAllPageRoutingModule {}
