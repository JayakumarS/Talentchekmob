import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstitutionDashboardListPageRoutingModule } from './institution-dashboard-list-routing.module';

import { InstitutionDashboardListPage } from './institution-dashboard-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstitutionDashboardListPageRoutingModule
  ],
  declarations: [InstitutionDashboardListPage]
})
export class InstitutionDashboardListPageModule {}
