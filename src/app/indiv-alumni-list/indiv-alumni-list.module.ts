import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndivAlumniListPageRoutingModule } from './indiv-alumni-list-routing.module';

import { IndivAlumniListPage } from './indiv-alumni-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndivAlumniListPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [IndivAlumniListPage]
})
export class IndivAlumniListPageModule {}
