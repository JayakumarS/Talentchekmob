import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkExperiencesPageRoutingModule } from './work-experiences-routing.module';

import { WorkExperiencesPage } from './work-experiences.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    WorkExperiencesPageRoutingModule
  ],
  declarations: [WorkExperiencesPage]
})
export class WorkExperiencesPageModule {

}
