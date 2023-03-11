import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPasswordModalPageRoutingModule } from './folder-password-modal-routing.module';

import { FolderPasswordModalPage } from './folder-password-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FolderPasswordModalPageRoutingModule
  ],
  declarations: [FolderPasswordModalPage]
})
export class FolderPasswordModalPageModule {}
