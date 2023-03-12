import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchSettingsPageRoutingModule } from './search-settings-routing.module';

import { SearchSettingsPage } from './search-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchSettingsPageRoutingModule
  ],
  declarations: [SearchSettingsPage]
})
export class SearchSettingsPageModule {}
