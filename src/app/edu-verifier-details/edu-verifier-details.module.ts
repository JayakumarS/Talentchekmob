import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EduVerifierDetailsPageRoutingModule } from './edu-verifier-details-routing.module';

import { EduVerifierDetailsPage } from './edu-verifier-details.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EduVerifierDetailsPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [EduVerifierDetailsPage]
})
export class EduVerifierDetailsPageModule {}
