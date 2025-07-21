import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPopupPageRoutingModule } from './search-popup-routing.module';

import { SearchPopupPage } from './search-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPopupPageRoutingModule
  ],
  declarations: [SearchPopupPage]
})
export class SearchPopupPageModule {}
