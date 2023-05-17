import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileePageRoutingModule } from './profilee-routing.module';

import { ProfileePage } from './profilee.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfileePageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [ProfileePage]
})
export class ProfileePageModule {}
