import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GTrackPageRoutingModule } from './g-track-routing.module';

import { GTrackPage } from './g-track.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    GTrackPageRoutingModule
  ],
  declarations: [GTrackPage]
})
export class GTrackPageModule {}
