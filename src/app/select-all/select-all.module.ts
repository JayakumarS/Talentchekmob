import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectAllPageRoutingModule } from './select-all-routing.module';

import { SelectAllPage } from './select-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectAllPageRoutingModule
  ],
  declarations: [SelectAllPage]
})
export class SelectAllPageModule {}
