import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterCatPage } from './register-cat.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterCatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterCatPageRoutingModule {}
