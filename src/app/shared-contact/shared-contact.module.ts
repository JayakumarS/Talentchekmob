import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedContactPageRoutingModule } from './shared-contact-routing.module';

import { SharedContactPage } from './shared-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedContactPageRoutingModule
  ],
  declarations: [SharedContactPage]
})
export class SharedContactPageModule {}
