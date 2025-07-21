import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeriveslistPage } from './seriveslist.page';

const routes: Routes = [
  {
    path: '',
    component: SeriveslistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeriveslistPageRoutingModule {}
