import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedContactPageRoutingModule } from './shared-contact-routing.module';

import { SharedContactPage } from './shared-contact.page';
import { Contacts } from '@ionic-native/contacts/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedContactPageRoutingModule
  ],
  declarations: [SharedContactPage],
  providers: [
    Contacts
  ],
})
export class SharedContactPageModule {}
