import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardIndividualPageRoutingModule } from './dashboard-individual-routing.module';

import { DashboardIndividualPage } from './dashboard-individual.page';

import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardIndividualPageRoutingModule,
    TranslateModule
  ],
  declarations: [DashboardIndividualPage]
})
export class DashboardIndividualPageModule {}
