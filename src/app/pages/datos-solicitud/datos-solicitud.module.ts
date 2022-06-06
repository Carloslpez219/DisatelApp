import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosSolicitudPageRoutingModule } from './datos-solicitud-routing.module';

import { DatosSolicitudPage } from './datos-solicitud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosSolicitudPageRoutingModule
  ],
  declarations: [DatosSolicitudPage]
})
export class DatosSolicitudPageModule {}
