import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YettostartPage } from './yettostart.page';

const routes: Routes = [
  {
    path: '',
    component: YettostartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YettostartPageRoutingModule {}
