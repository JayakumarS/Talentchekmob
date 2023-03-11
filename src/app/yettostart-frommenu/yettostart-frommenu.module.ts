import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YettostartFrommenuPageRoutingModule } from './yettostart-frommenu-routing.module';

import { YettostartFrommenuPage } from './yettostart-frommenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YettostartFrommenuPageRoutingModule
  ],
  declarations: [YettostartFrommenuPage]
})
export class YettostartFrommenuPageModule {}
