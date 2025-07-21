import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPasswordModalPage } from './folder-password-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FolderPasswordModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPasswordModalPageRoutingModule {}
