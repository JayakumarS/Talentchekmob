import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatingExtraPopupPageRoutingModule } from './rating-extra-popup-routing.module';

import { RatingExtraPopupPage } from './rating-extra-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RatingExtraPopupPageRoutingModule
  ],
  declarations: [RatingExtraPopupPage]
})
export class RatingExtraPopupPageModule {}
