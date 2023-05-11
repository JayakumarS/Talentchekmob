import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectionListPage } from './connection-list.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectionListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectionListPageRoutingModule {}
