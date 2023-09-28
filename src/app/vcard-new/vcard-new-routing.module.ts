import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VcardNewPage } from './vcard-new.page';

const routes: Routes = [
  {
    path: '',
    component: VcardNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VcardNewPageRoutingModule {}
