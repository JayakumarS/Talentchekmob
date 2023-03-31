import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriptionInsorgPageRoutingModule } from './subscription-insorg-routing.module';

import { SubscriptionInsorgPage } from './subscription-insorg.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionInsorgPageRoutingModule
  ],
  declarations: [SubscriptionInsorgPage]
})
export class SubscriptionInsorgPageModule {}
