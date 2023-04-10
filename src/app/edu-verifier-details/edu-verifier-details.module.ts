import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EduVerifierDetailsPageRoutingModule } from './edu-verifier-details-routing.module';

import { EduVerifierDetailsPage } from './edu-verifier-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EduVerifierDetailsPageRoutingModule
  ],
  declarations: [EduVerifierDetailsPage]
})
export class EduVerifierDetailsPageModule {}
