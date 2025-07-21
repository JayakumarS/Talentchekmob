import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisibilityPageRoutingModule } from './visibility-routing.module';

import { VisibilityPage } from './visibility.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisibilityPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [VisibilityPage]
})
export class VisibilityPageModule {}
