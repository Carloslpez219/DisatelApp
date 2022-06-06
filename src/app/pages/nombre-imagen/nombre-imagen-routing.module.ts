import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NombreImagenPage } from './nombre-imagen.page';

const routes: Routes = [
  {
    path: '',
    component: NombreImagenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NombreImagenPageRoutingModule {}
