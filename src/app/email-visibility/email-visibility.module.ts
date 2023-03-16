import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailVisibilityPageRoutingModule } from './email-visibility-routing.module';

import { EmailVisibilityPage } from './email-visibility.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EmailVisibilityPageRoutingModule
  ],
  declarations: [EmailVisibilityPage]
})
export class EmailVisibilityPageModule {}
