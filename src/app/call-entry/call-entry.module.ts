import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CallEntryPageRoutingModule } from './call-entry-routing.module';

import { CallEntryPage } from './call-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CallEntryPageRoutingModule
  ],
  declarations: [CallEntryPage]
})
export class CallEntryPageModule {}
