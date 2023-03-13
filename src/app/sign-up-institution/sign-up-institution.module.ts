import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpInstitutionPageRoutingModule } from './sign-up-institution-routing.module';

import { SignUpInstitutionPage } from './sign-up-institution.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpInstitutionPageRoutingModule
  ],
  declarations: [SignUpInstitutionPage]
})
export class SignUpInstitutionPageModule {}
