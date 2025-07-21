import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgetPasswordResetSuccessPageRoutingModule } from './forget-password-reset-success-routing.module';

import { ForgetPasswordResetSuccessPage } from './forget-password-reset-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgetPasswordResetSuccessPageRoutingModule
  ],
  declarations: [ForgetPasswordResetSuccessPage]
})
export class ForgetPasswordResetSuccessPageModule {}
