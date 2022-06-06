import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { TrabajarVehiculoPage } from '../trabajar-vehiculo/trabajar-vehiculo.page';
import { Platform } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';
import { ChecklistPage } from '../checklist/checklist.page';

@Component({
  selector: 'app-ver-vehiculo',
  templateUrl: './ver-vehiculo.page.html',
  styleUrls: ['./ver-vehiculo.page.scss'],
})
export class VerVehiculoPage implements OnInit {

  @Input() vehiculo;
  @Input() ordenEspecifica;
  @Input() i;
  @Input() ind;

  viewEntered;

  ionViewDidEnter() {
    setTimeout(() => {
      this.viewEntered = true;
    }, 1000);
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  constructor(private modalController: ModalController, private loadingController: LoadingController, private platform: Platform,
              private alertService: AlertService) { }

  ngOnInit() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000);
  }

  back(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
    const x = true;
    this.modalController.dismiss(x);
  }

  async mostrarChecklist(){
    const orden = this.ordenEspecifica;
    const i = this.i;
    const vehiculo = this.vehiculo;
    const modal = await this.modalController.create({
      component: ChecklistPage,
      backdropDismiss: false,
      componentProps: { orden, i, vehiculo }
    });
    await modal.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  async mostrarModalVehiculo() {
    if (this.ordenEspecifica.status_codigo !== 4){
      if (this.vehiculo.situacion_trabajo === 1){
        const orden = await this.ordenEspecifica;
        const i = await this.i;
        const vehiculoTrabajando = await this.vehiculo;
        const ordenEspe = await this.ordenEspecifica;
        const index = await this.i;
        const ind = await this.ind;
        const modal = await this.modalController.create({
          component: ChecklistPage,
          backdropDismiss: false,
          componentProps: { orden, i, vehiculoTrabajando,  ordenEspe, index, ind }
        });
        await modal.present();
      }else if (this.vehiculo.situacion_trabajo === 2 || this.vehiculo.situacion_trabajo === 3 || this.vehiculo.situacion_trabajo === 4
                || this.vehiculo.situacion_trabajo === 5 || this.vehiculo.situacion_trabajo === 0 ||
                this.vehiculo.situacion_trabajo === 10){
        const vehiculoTrabajando = await this.vehiculo;
        const ordenEspe = await this.ordenEspecifica;
        const index = await this.i;
        const ind = await this.ind;
        const modal = await this.modalController.create({
        component: TrabajarVehiculoPage,
        backdropDismiss: false,
        componentProps: { vehiculoTrabajando,  ordenEspe, index, ind}
        });
        await modal.present();
      }
    }else{
      this.alertService.presentToast('Esperando autorización', 'warning', 3500);
    }
  }

}
