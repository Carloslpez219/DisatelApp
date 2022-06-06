import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalSignPage } from './modal-sign.page';

const routes: Routes = [
  {
    path: '',
    component: ModalSignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalSignPageRoutingModule {}
