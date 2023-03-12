import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchSettingsPage } from './search-settings.page';

const routes: Routes = [
  {
    path: '',
    component: SearchSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchSettingsPageRoutingModule {}
