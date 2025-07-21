import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutDevicePageRoutingModule } from './about-device-routing.module';

import { AboutDevicePage } from './about-device.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutDevicePageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [AboutDevicePage]
})
export class AboutDevicePageModule {}
