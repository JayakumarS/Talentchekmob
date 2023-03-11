import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CallEntryCustomerSearchPageRoutingModule } from './call-entry-customer-search-routing.module';

import { CallEntryCustomerSearchPage } from './call-entry-customer-search.page';

import{ EditCustomerModalPageModule } from '../modals/edit-customer-modal/edit-customer-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CallEntryCustomerSearchPageRoutingModule,
    EditCustomerModalPageModule
  ],
  declarations: [CallEntryCustomerSearchPage]
})
export class CallEntryCustomerSearchPageModule {}
