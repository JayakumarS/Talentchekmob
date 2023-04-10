import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BidsAndAplicationsRecivedPopupPageRoutingModule } from './bids-and-aplications-recived-popup-routing.module';

import { BidsAndAplicationsRecivedPopupPage } from './bids-and-aplications-recived-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BidsAndAplicationsRecivedPopupPageRoutingModule
  ],
  declarations: [BidsAndAplicationsRecivedPopupPage]
})
export class BidsAndAplicationsRecivedPopupPageModule {}
