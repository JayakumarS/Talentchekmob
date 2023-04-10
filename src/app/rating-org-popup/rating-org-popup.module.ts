import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatingOrgPopupPageRoutingModule } from './rating-org-popup-routing.module';

import { RatingOrgPopupPage } from './rating-org-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RatingOrgPopupPageRoutingModule
  ],
  declarations: [RatingOrgPopupPage]
})
export class RatingOrgPopupPageModule {}
