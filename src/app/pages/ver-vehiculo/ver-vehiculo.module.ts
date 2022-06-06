import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerVehiculoPageRoutingModule } from './ver-vehiculo-routing.module';

import { VerVehiculoPage } from './ver-vehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerVehiculoPageRoutingModule
  ],
  declarations: [VerVehiculoPage]
})
export class VerVehiculoPageModule {}
