import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpInstitutionPageRoutingModule } from './sign-up-institution-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { SignUpInstitutionPage } from './sign-up-institution.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    SignUpInstitutionPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [SignUpInstitutionPage]
})
export class SignUpInstitutionPageModule {}
