import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileVisibilityPageRoutingModule } from './profile-visibility-routing.module';

import { ProfileVisibilityPage } from './profile-visibility.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfileVisibilityPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [ProfileVisibilityPage]
})
export class ProfileVisibilityPageModule {}
