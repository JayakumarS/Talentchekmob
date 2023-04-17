import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebAppNavPageRoutingModule } from './web-app-nav-routing.module';

import { WebAppNavPage } from './web-app-nav.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WebAppNavPageRoutingModule
  ],
  declarations: [WebAppNavPage]
})
export class WebAppNavPageModule {}
