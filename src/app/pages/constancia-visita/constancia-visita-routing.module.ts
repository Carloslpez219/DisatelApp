import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConstanciaVisitaPage } from './constancia-visita.page';

const routes: Routes = [
  {
    path: '',
    component: ConstanciaVisitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstanciaVisitaPageRoutingModule {}
