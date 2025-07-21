import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AwesomePageRoutingModule } from './awesome-routing.module';

import { AwesomePage } from './awesome.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AwesomePageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [AwesomePage]
})
export class AwesomePageModule {}
