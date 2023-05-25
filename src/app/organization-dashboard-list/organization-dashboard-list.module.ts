import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationDashboardListPageRoutingModule } from './organization-dashboard-list-routing.module';

import { OrganizationDashboardListPage } from './organization-dashboard-list.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationDashboardListPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [OrganizationDashboardListPage]
})
export class OrganizationDashboardListPageModule {}
