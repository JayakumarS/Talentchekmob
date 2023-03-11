import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCustomerModalPageRoutingModule } from './edit-customer-modal-routing.module';

import { EditCustomerModalPage } from './edit-customer-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCustomerModalPageRoutingModule
  ],
  declarations: [EditCustomerModalPage]
})
export class EditCustomerModalPageModule {}
