import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbicacionEquipoPageRoutingModule } from './ubicacion-equipo-routing.module';

import { UbicacionEquipoPage } from './ubicacion-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbicacionEquipoPageRoutingModule
  ],
  declarations: [UbicacionEquipoPage]
})
export class UbicacionEquipoPageModule {}
