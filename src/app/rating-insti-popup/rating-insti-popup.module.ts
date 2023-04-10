import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatingInstiPopupPageRoutingModule } from './rating-insti-popup-routing.module';

import { RatingInstiPopupPage } from './rating-insti-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RatingInstiPopupPageRoutingModule
  ],
  declarations: [RatingInstiPopupPage]
})
export class RatingInstiPopupPageModule {}
