import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkillPopupPageRoutingModule } from './skill-popup-routing.module';

import { SkillPopupPage } from './skill-popup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SkillPopupPageRoutingModule
  ],
  declarations: [SkillPopupPage]
})
export class SkillPopupPageModule {}
