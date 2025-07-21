import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileVcardPageRoutingModule } from './profile-vcard-routing.module';

import { ProfileVcardPage } from './profile-vcard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileVcardPageRoutingModule
  ],
  declarations: [ProfileVcardPage]
})
export class ProfileVcardPageModule {}
