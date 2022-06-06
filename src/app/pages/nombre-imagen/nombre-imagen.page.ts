import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nombre-imagen',
  templateUrl: './nombre-imagen.page.html',
  styleUrls: ['./nombre-imagen.page.scss'],
})
export class NombreImagenPage implements OnInit {

  nombre;
  viewEntered;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.viewEntered = true;
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  aceptar(){
    this.modalController.dismiss(this.nombre);
  }

  back(){
    this.modalController.dismiss();
  }

}
