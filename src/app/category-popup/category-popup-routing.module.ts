import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryPopupPage } from './category-popup.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryPopupPageRoutingModule {}
