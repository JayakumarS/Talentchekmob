import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationDashboardPageRoutingModule } from './organization-dashboard-routing.module';

import { OrganizationDashboardPage } from './organization-dashboard.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationDashboardPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [OrganizationDashboardPage]
})
export class OrganizationDashboardPageModule {}
