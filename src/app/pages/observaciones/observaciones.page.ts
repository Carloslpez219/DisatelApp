import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-observaciones',
  templateUrl: './observaciones.page.html',
  styleUrls: ['./observaciones.page.scss'],
})
export class ObservacionesPage implements OnInit {

  @Input() observaciones;
  viewEntered;

  ionViewDidEnter() {
    setTimeout(() => {
      this.viewEntered = true;
    }, 1000);
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  constructor(private modalController: ModalController, private loadingController: LoadingController, private platform: Platform) { }

  ngOnInit() {
    setTimeout(() => {
      this.loadingController.dismiss();
      console.log(this.observaciones);
    }, 1000);
  }

  back(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
    this.modalController.dismiss();
  }

}
