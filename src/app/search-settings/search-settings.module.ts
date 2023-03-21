import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchSettingsPageRoutingModule } from './search-settings-routing.module';

import { SearchSettingsPage } from './search-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SearchSettingsPageRoutingModule
  ],
  declarations: [SearchSettingsPage]
})
export class SearchSettingsPageModule {}
