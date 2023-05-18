import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubscriptionIndividualPageRoutingModule } from './subscription-individual-routing.module';

import { SubscriptionIndividualPage } from './subscription-individual.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionIndividualPageRoutingModule,
    TranslateModule,
    TranslateModule.forChild(),
  ],
  declarations: [SubscriptionIndividualPage]
})
export class SubscriptionIndividualPageModule {}
