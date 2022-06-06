import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalObservacionesPage } from './modal-observaciones.page';

const routes: Routes = [
  {
    path: '',
    component: ModalObservacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalObservacionesPageRoutingModule {}
