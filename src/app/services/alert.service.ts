import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertCtrl: AlertController, public toastController: ToastController) { }

  async presentAlert(message) {
    const alert = await this.alertCtrl.create({
      message,
      mode: 'md',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message, color, duration) {
    const toast = await this.toastController.create({
      message,
      duration,
      color
    });
    toast.present();
  }

}
