import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerVehiculoPage } from './ver-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: VerVehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerVehiculoPageRoutingModule {}
