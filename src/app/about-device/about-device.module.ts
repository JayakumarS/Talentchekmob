import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutDevicePageRoutingModule } from './about-device-routing.module';

import { AboutDevicePage } from './about-device.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutDevicePageRoutingModule
  ],
  declarations: [AboutDevicePage]
})
export class AboutDevicePageModule {}
