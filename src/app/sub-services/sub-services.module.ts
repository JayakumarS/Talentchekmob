import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubServicesPageRoutingModule } from './sub-services-routing.module';

import { SubServicesPage } from './sub-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubServicesPageRoutingModule
  ],
  declarations: [SubServicesPage]
})
export class SubServicesPageModule {}
