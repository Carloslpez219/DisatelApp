import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosSolicitudPage } from './datos-solicitud.page';

const routes: Routes = [
  {
    path: '',
    component: DatosSolicitudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosSolicitudPageRoutingModule {}
