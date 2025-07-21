import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkExperiencesPageRoutingModule } from './work-experiences-routing.module';

import { WorkExperiencesPage } from './work-experiences.page';
import { CKEditorModule } from 'ckeditor4-angular';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],


  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CKEditorModule,
    WorkExperiencesPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [WorkExperiencesPage]
})
export class WorkExperiencesPageModule {

}
