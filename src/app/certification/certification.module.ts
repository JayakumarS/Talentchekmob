import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CertificationPageRoutingModule } from './certification-routing.module';

import { CertificationPage } from './certification.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CertificationPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [CertificationPage]
})
export class CertificationPageModule {}
