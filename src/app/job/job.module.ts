import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobPageRoutingModule } from './job-routing.module';

import { JobPage } from './job.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JobPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [JobPage]
})
export class JobPageModule {}
