import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerSIMPage } from './ver-sim.page';

const routes: Routes = [
  {
    path: '',
    component: VerSIMPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerSIMPageRoutingModule {}
