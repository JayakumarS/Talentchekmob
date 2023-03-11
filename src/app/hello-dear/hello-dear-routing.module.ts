import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelloDearPage } from './hello-dear.page';

const routes: Routes = [
  {
    path: '',
    component: HelloDearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelloDearPageRoutingModule {}
