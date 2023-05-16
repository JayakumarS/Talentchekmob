import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CKEditorModule } from 'ckeditor4-angular';

import { OniJobPostPageRoutingModule } from './oni-job-post-routing.module';

import { OniJobPostPage } from './oni-job-post.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CKEditorModule,
    ReactiveFormsModule,
    OniJobPostPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [OniJobPostPage]
})
export class OniJobPostPageModule {}
