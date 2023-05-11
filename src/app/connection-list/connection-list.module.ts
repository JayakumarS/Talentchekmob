import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectionListPageRoutingModule } from './connection-list-routing.module';

import { ConnectionListPage } from './connection-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectionListPageRoutingModule
  ],
  declarations: [ConnectionListPage]
})
export class ConnectionListPageModule {}
