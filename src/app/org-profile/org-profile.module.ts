import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrgProfilePageRoutingModule } from './org-profile-routing.module';

import { OrgProfilePage } from './org-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    OrgProfilePageRoutingModule
  ],
  declarations: [OrgProfilePage]
})
export class OrgProfilePageModule {}
