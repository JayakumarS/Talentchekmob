import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EduVerificationPageRoutingModule } from './edu-verification-routing.module';

import { EduVerificationPage } from './edu-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EduVerificationPageRoutingModule
  ],
  declarations: [EduVerificationPage]
})
export class EduVerificationPageModule {}
