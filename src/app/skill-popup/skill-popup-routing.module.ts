import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkillPopupPage } from './skill-popup.page';

const routes: Routes = [
  {
    path: '',
    component: SkillPopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillPopupPageRoutingModule {}
