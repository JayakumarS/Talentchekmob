import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplyForJobPageRoutingModule } from './apply-for-job-routing.module';

import { ApplyForJobPage } from './apply-for-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplyForJobPageRoutingModule
  ],
  declarations: [ApplyForJobPage]
})
export class ApplyForJobPageModule {}
