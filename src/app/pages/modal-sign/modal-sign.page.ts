import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-modal-sign',
  templateUrl: './modal-sign.page.html',
  styleUrls: ['./modal-sign.page.scss'],
})
export class ModalSignPage implements OnInit {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions = { // passed through to szimek/signature_pad constructor
    minWidth: 1,
    canvasWidth: 260,
    canvasHeight: 190,
    cancelable : false,
    backgroundColor : '#F3F3F1'
  };

  signature = '';

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  back(){
    this.signature = '../../../assets/img/imageSign.jpg';
    this.modalController.dismiss(this.signature);
  }

drawComplete(){
    this.signature = this.signaturePad.toDataURL('image/jpeg');
  }

ok(){
    this.signaturePad.clear();
    this.modalController.dismiss(this.signature);
  }


reset(){
    this.signaturePad.clear();
    this.signature = '../../../assets/img/imageSign.jpg';
}

}
