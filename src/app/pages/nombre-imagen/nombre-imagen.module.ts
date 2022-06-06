import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NombreImagenPageRoutingModule } from './nombre-imagen-routing.module';

import { NombreImagenPage } from './nombre-imagen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NombreImagenPageRoutingModule
  ],
  declarations: [NombreImagenPage]
})
export class NombreImagenPageModule {}
