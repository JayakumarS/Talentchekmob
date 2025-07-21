import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneVisibilityPageRoutingModule } from './phone-visibility-routing.module';

import { PhoneVisibilityPage } from './phone-visibility.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PhoneVisibilityPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [PhoneVisibilityPage]
})
export class PhoneVisibilityPageModule {}
