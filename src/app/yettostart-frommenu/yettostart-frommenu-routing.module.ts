import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YettostartFrommenuPage } from './yettostart-frommenu.page';

const routes: Routes = [
  {
    path: '',
    component: YettostartFrommenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YettostartFrommenuPageRoutingModule {}
