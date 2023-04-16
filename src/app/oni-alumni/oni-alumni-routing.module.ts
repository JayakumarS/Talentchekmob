import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OniAlumniPage } from './oni-alumni.page';

const routes: Routes = [
  {
    path: '',
    component: OniAlumniPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OniAlumniPageRoutingModule {}
