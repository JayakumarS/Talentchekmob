import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VcardNewPageRoutingModule } from './vcard-new-routing.module';

import { VcardNewPage } from './vcard-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VcardNewPageRoutingModule
  ],
  declarations: [VcardNewPage]
})
export class VcardNewPageModule {}
