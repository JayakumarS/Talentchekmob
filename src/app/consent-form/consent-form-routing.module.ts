import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsentFormPage } from './consent-form.page';

const routes: Routes = [
  {
    path: '',
    component: ConsentFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsentFormPageRoutingModule {}
