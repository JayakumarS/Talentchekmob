import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterCatPageRoutingModule } from './register-cat-routing.module';

import { RegisterCatPage } from './register-cat.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterCatPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [RegisterCatPage]
})
export class RegisterCatPageModule {}
