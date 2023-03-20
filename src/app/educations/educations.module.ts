import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EducationsPageRoutingModule } from './educations-routing.module';

import { EducationsPage } from './educations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EducationsPageRoutingModule
  ],
  declarations: [EducationsPage]
})
export class EducationsPageModule {}
