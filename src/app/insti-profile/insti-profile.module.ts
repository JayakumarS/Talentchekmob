import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstiProfilePageRoutingModule } from './insti-profile-routing.module';

import { InstiProfilePage } from './insti-profile.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    InstiProfilePageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [InstiProfilePage]
})
export class InstiProfilePageModule {}
