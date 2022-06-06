import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-general-ckecklist',
  templateUrl: './general-ckecklist.page.html',
  styleUrls: ['./general-ckecklist.page.scss'],
})
export class GeneralCkecklistPage implements OnInit {

  @Input() grl;
  respuestas = [];
  def = [];
  respuestax;

  viewEntered;
  viewEntered2 = false;

  ionViewDidEnter() {
    setTimeout(() => {
      this.viewEntered = false;
      this.viewEntered2 = true;
    }, 500);
    setTimeout(() => {
      this.viewEntered = true;
    }, 2500);
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  constructor( private platform: Platform, private modalController: ModalController ) { }

  ngOnInit() {
    for (let index = 0; index < 10; index++) {
      this.def.push(this.grl[index]);
    }
  }

  async back(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
    this.modalController.dismiss();
  }

  respuesta(event, i){
    this.respuestax = {
      codigo: this.def[i][0].codigo,
      valor: event.detail.value
    };

    this.respuestas[i] = this.respuestax;
  }

  siguiente(){
    this.modalController.dismiss(this.respuestas);
  }

}
