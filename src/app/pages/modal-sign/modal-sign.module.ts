import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalSignPageRoutingModule } from './modal-sign-routing.module';

import { ModalSignPage } from './modal-sign.page';
import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalSignPageRoutingModule,
    SignaturePadModule
  ],
  declarations: [ModalSignPage]
})
export class ModalSignPageModule {}
