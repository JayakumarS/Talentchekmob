import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileSearchPageRoutingModule } from './profile-search-routing.module';

import { ProfileSearchPage } from './profile-search.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProfileSearchPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [ProfileSearchPage]
})
export class ProfileSearchPageModule {}
