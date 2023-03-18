import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AwesomePage } from './awesome.page';

const routes: Routes = [
  {
    path: '',
    component: AwesomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AwesomePageRoutingModule {}
