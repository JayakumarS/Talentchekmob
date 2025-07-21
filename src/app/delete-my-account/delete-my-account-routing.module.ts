import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteMyAccountPage } from './delete-my-account.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteMyAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteMyAccountPageRoutingModule {}
