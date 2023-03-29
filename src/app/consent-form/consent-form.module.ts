import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsentFormPageRoutingModule } from './consent-form-routing.module';

import { ConsentFormPage } from './consent-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsentFormPageRoutingModule
  ],
  declarations: [ConsentFormPage]
})
export class ConsentFormPageModule {}
