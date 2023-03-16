import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileVisibilityPageRoutingModule } from './profile-visibility-routing.module';

import { ProfileVisibilityPage } from './profile-visibility.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfileVisibilityPageRoutingModule
  ],
  declarations: [ProfileVisibilityPage]
})
export class ProfileVisibilityPageModule {}
