import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrgProfilePageRoutingModule } from './org-profile-routing.module';

import { OrgProfilePage } from './org-profile.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    OrgProfilePageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [OrgProfilePage]
})
export class OrgProfilePageModule {}
