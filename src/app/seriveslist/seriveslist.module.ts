import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeriveslistPageRoutingModule } from './seriveslist-routing.module';

import { SeriveslistPage } from './seriveslist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeriveslistPageRoutingModule
  ],
  declarations: [SeriveslistPage]
})
export class SeriveslistPageModule {}
