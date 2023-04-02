import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CKEditorModule } from 'ckeditor4-angular';

import { OniJobPostPageRoutingModule } from './oni-job-post-routing.module';

import { OniJobPostPage } from './oni-job-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CKEditorModule,
    ReactiveFormsModule,
    OniJobPostPageRoutingModule
  ],
  declarations: [OniJobPostPage]
})
export class OniJobPostPageModule {}
