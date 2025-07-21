import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
 
import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import {TranslateModule} from '@ngx-translate/core';

import { AppVersion } from '@ionic-native/app-version/ngx';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
    TranslateModule
  ],
  declarations: [LoginPage],
  providers: [
    AppVersion
  ],
})
export class LoginPageModule {}
