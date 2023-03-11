import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAcademicInformationPageRoutingModule } from './add-academic-information-routing.module';

import { AddAcademicInformationPage } from './add-academic-information.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAcademicInformationPageRoutingModule,
    ReactiveFormsModule
    
  ],
  declarations: [AddAcademicInformationPage]
})
export class AddAcademicInformationPageModule {}
