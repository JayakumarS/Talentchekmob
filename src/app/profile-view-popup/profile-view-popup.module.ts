import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileViewPopupPageRoutingModule } from './profile-view-popup-routing.module';

import { ProfileViewPopupPage } from './profile-view-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileViewPopupPageRoutingModule
  ],
  declarations: [ProfileViewPopupPage]
})
export class ProfileViewPopupPageModule {}
