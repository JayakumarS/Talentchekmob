import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TcFormPageRoutingModule } from './tc-form-routing.module';

import { TcFormPage } from './tc-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TcFormPageRoutingModule
  ],
  declarations: [TcFormPage]
})
export class TcFormPageModule {}
