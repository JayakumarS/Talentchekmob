import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OniAlumniPageRoutingModule } from './oni-alumni-routing.module';

import { OniAlumniPage } from './oni-alumni.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OniAlumniPageRoutingModule
  ],
  declarations: [OniAlumniPage]
})
export class OniAlumniPageModule {}
