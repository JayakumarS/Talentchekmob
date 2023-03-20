import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';


import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { ProfileViewRoutingModule } from './profile-view-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileViewRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ]
})
export class ProfileViewModule { }
