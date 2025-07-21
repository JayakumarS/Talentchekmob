import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YettostartPageRoutingModule } from './yettostart-routing.module';

import { YettostartPage } from './yettostart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YettostartPageRoutingModule
  ],
  declarations: [YettostartPage]
})
export class YettostartPageModule {}
