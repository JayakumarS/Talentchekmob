import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpOrganizationPageRoutingModule } from './sign-up-organization-routing.module';

import { SignUpOrganizationPage } from './sign-up-organization.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    

    SignUpOrganizationPageRoutingModule,
  ],
  declarations: [SignUpOrganizationPage]
})
export class SignUpOrganizationPageModule {}
