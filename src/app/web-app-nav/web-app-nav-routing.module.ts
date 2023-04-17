import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebAppNavPage } from './web-app-nav.page';

const routes: Routes = [
  {
    path: '',
    component: WebAppNavPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebAppNavPageRoutingModule {}
