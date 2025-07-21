import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileePage } from './profilee.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileePageRoutingModule {}
