import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OniAlumniListPageRoutingModule } from './oni-alumni-list-routing.module';

import { OniAlumniListPage } from './oni-alumni-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OniAlumniListPageRoutingModule
  ],
  declarations: [OniAlumniListPage]
})
export class OniAlumniListPageModule {}
