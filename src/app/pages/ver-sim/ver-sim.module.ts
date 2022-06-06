import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerSIMPageRoutingModule } from './ver-sim-routing.module';

import { VerSIMPage } from './ver-sim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerSIMPageRoutingModule
  ],
  declarations: [VerSIMPage]
})
export class VerSIMPageModule {}
