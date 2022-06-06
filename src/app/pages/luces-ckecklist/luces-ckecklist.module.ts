import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LucesCkecklistPageRoutingModule } from './luces-ckecklist-routing.module';

import { LucesCkecklistPage } from './luces-ckecklist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LucesCkecklistPageRoutingModule
  ],
  declarations: [LucesCkecklistPage]
})
export class LucesCkecklistPageModule {}
