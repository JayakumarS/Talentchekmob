import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GTrackPage } from './g-track.page';

const routes: Routes = [
  {
    path: '',
    component: GTrackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GTrackPageRoutingModule {}
