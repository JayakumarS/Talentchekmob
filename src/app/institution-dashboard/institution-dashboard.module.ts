import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstitutionDashboardPageRoutingModule } from './institution-dashboard-routing.module';

import { InstitutionDashboardPage } from './institution-dashboard.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstitutionDashboardPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [InstitutionDashboardPage]
})
export class InstitutionDashboardPageModule {}
