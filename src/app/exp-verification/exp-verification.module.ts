import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpVerificationPageRoutingModule } from './exp-verification-routing.module';

import { ExpVerificationPage } from './exp-verification.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpVerificationPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [ExpVerificationPage]
})
export class ExpVerificationPageModule {}
