import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrgProfileViewPageRoutingModule } from './org-profile-view-routing.module';

import { OrgProfileViewPage } from './org-profile-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrgProfileViewPageRoutingModule
  ],
  declarations: [OrgProfileViewPage]
})
export class OrgProfileViewPageModule {}
