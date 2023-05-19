import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OniJobPostListPageRoutingModule } from './oni-job-post-list-routing.module';

import { OniJobPostListPage } from './oni-job-post-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OniJobPostListPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [OniJobPostListPage]
})
export class OniJobPostListPageModule {}
