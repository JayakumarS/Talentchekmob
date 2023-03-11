import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserSignupPageRoutingModule } from './user-signup-routing.module';

import { UserSignupPage } from './user-signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserSignupPageRoutingModule
  ],
  declarations: [UserSignupPage]
})
export class UserSignupPageModule {}
