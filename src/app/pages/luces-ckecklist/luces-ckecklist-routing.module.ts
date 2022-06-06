import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LucesCkecklistPage } from './luces-ckecklist.page';

const routes: Routes = [
  {
    path: '',
    component: LucesCkecklistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LucesCkecklistPageRoutingModule {}
