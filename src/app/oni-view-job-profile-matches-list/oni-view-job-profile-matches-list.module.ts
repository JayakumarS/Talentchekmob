import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OniViewJobProfileMatchesListPageRoutingModule } from './oni-view-job-profile-matches-list-routing.module';

import { OniViewJobProfileMatchesListPage } from './oni-view-job-profile-matches-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OniViewJobProfileMatchesListPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [OniViewJobProfileMatchesListPage]
})
export class OniViewJobProfileMatchesListPageModule {}
