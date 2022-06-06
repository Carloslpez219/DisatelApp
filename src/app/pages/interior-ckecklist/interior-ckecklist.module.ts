import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InteriorCkecklistPageRoutingModule } from './interior-ckecklist-routing.module';

import { InteriorCkecklistPage } from './interior-ckecklist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InteriorCkecklistPageRoutingModule
  ],
  declarations: [InteriorCkecklistPage]
})
export class InteriorCkecklistPageModule {}
