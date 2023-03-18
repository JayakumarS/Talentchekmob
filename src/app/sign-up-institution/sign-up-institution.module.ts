import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpInstitutionPageRoutingModule } from './sign-up-institution-routing.module';

import { SignUpInstitutionPage } from './sign-up-institution.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SignUpInstitutionPageRoutingModule
  ],
  declarations: [SignUpInstitutionPage]
})
export class SignUpInstitutionPageModule {}
