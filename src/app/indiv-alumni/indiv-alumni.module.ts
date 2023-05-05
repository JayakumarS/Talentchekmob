import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndivAlumniPageRoutingModule } from './indiv-alumni-routing.module';

import { IndivAlumniPage } from './indiv-alumni.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndivAlumniPageRoutingModule
  ],
  declarations: [IndivAlumniPage]
})
export class IndivAlumniPageModule {}
