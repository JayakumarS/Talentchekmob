import {  CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchSettingsPageRoutingModule } from './search-settings-routing.module';

import { SearchSettingsPage } from './search-settings.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SearchSettingsPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [SearchSettingsPage]
})
export class SearchSettingsPageModule {}
