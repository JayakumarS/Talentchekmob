import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditionalInfooPageRoutingModule } from './additional-infoo-routing.module';

import { AdditionalInfooPage } from './additional-infoo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AdditionalInfooPageRoutingModule
  ],
  declarations: [AdditionalInfooPage]
})
export class AdditionalInfooPageModule {}
