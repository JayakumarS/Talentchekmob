import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPopupPageRoutingModule } from './category-popup-routing.module';

import { CategoryPopupPage } from './category-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPopupPageRoutingModule
  ],
  declarations: [CategoryPopupPage]
})
export class CategoryPopupPageModule {}
