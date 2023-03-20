import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JobSearchPageRoutingModule } from './job-search-routing.module';

import { JobSearchPage } from './job-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    JobSearchPageRoutingModule
  ],
  declarations: [JobSearchPage]
})
export class JobSearchPageModule {}
