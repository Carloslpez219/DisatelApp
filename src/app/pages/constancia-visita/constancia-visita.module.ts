import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConstanciaVisitaPageRoutingModule } from './constancia-visita-routing.module';

import { ConstanciaVisitaPage } from './constancia-visita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConstanciaVisitaPageRoutingModule
  ],
  declarations: [ConstanciaVisitaPage]
})
export class ConstanciaVisitaPageModule {}
