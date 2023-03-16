import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneVisibilityPageRoutingModule } from './phone-visibility-routing.module';

import { PhoneVisibilityPage } from './phone-visibility.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PhoneVisibilityPageRoutingModule
  ],
  declarations: [PhoneVisibilityPage]
})
export class PhoneVisibilityPageModule {}
