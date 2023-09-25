import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPopupPage } from './search-popup.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPopupPageRoutingModule {}
