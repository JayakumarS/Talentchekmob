import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanToConnectPage } from './scan-to-connect.page';

const routes: Routes = [
  {
    path: '',
    component: ScanToConnectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanToConnectPageRoutingModule {}
