import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditCustomerModalPage } from './edit-customer-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditCustomerModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditCustomerModalPageRoutingModule {}
