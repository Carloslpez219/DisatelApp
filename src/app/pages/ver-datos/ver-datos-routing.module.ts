import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerDatosPage } from './ver-datos.page';

const routes: Routes = [
  {
    path: '',
    component: VerDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerDatosPageRoutingModule {}
