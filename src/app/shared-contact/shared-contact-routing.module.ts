import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedContactPage } from './shared-contact.page';

const routes: Routes = [
  {
    path: '',
    component: SharedContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedContactPageRoutingModule {}
