import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TcFormPage } from './tc-form.page';

const routes: Routes = [
  {
    path: '',
    component: TcFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TcFormPageRoutingModule {}
