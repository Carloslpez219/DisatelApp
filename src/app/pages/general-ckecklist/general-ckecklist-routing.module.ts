import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralCkecklistPage } from './general-ckecklist.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralCkecklistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralCkecklistPageRoutingModule {}
