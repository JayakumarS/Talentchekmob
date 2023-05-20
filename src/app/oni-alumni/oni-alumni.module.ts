import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OniAlumniPageRoutingModule } from './oni-alumni-routing.module';

import { OniAlumniPage } from './oni-alumni.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OniAlumniPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [OniAlumniPage]
})
export class OniAlumniPageModule {}
