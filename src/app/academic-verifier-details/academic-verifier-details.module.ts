import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcademicVerifierDetailsPageRoutingModule } from './academic-verifier-details-routing.module';

import { AcademicVerifierDetailsPage } from './academic-verifier-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AcademicVerifierDetailsPageRoutingModule
  ],
  declarations: [AcademicVerifierDetailsPage]
})
export class AcademicVerifierDetailsPageModule {}
