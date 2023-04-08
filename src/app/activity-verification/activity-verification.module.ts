import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityVerificationPageRoutingModule } from './activity-verification-routing.module';

import { ActivityVerificationPage } from './activity-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityVerificationPageRoutingModule
  ],
  declarations: [ActivityVerificationPage]
})
export class ActivityVerificationPageModule {}
