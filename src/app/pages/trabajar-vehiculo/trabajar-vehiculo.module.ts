import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrabajarVehiculoPageRoutingModule } from './trabajar-vehiculo-routing.module';

import { TrabajarVehiculoPage } from './trabajar-vehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrabajarVehiculoPageRoutingModule
  ],
  declarations: [TrabajarVehiculoPage]
})
export class TrabajarVehiculoPageModule {}
