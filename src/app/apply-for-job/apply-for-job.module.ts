import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplyForJobPageRoutingModule } from './apply-for-job-routing.module';

import { ApplyForJobPage } from './apply-for-job.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplyForJobPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [ApplyForJobPage]
})
export class ApplyForJobPageModule {}
