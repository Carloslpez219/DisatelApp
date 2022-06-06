import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalObservacionesPageRoutingModule } from './modal-observaciones-routing.module';

import { ModalObservacionesPage } from './modal-observaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalObservacionesPageRoutingModule
  ],
  declarations: [ModalObservacionesPage]
})
export class ModalObservacionesPageModule {}
