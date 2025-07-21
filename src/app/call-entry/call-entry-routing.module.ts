import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallEntryPage } from './call-entry.page';

const routes: Routes = [
  {
    path: '',
    component: CallEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallEntryPageRoutingModule {}
