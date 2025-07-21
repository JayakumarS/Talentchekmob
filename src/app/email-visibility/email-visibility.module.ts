import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailVisibilityPageRoutingModule } from './email-visibility-routing.module';

import { EmailVisibilityPage } from './email-visibility.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EmailVisibilityPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [EmailVisibilityPage]
})
export class EmailVisibilityPageModule {}
