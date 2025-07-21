import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAcademicInformationPage } from './add-academic-information.page';

const routes: Routes = [
  {
    path: '',
    component: AddAcademicInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAcademicInformationPageRoutingModule {}
