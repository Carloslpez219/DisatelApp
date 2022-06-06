import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerDatosPageRoutingModule } from './ver-datos-routing.module';

import { VerDatosPage } from './ver-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerDatosPageRoutingModule
  ],
  declarations: [VerDatosPage]
})
export class VerDatosPageModule {}
