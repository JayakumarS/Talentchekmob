import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPopupPageRoutingModule } from './category-popup-routing.module';

import { CategoryPopupPage } from './category-popup.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPopupPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [CategoryPopupPage]
})
export class CategoryPopupPageModule {}
