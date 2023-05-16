import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrgProfileViewPageRoutingModule } from './org-profile-view-routing.module';

import { OrgProfileViewPage } from './org-profile-view.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrgProfileViewPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [OrgProfileViewPage]
})
export class OrgProfileViewPageModule {}
