import { Component, Input, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { VerDatosPage } from '../ver-datos/ver-datos.page';
import { VerSIMPage } from '../ver-sim/ver-sim.page';
import { VerVehiculoPage } from '../ver-vehiculo/ver-vehiculo.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DisatelService } from 'src/app/services/disatel.service';
import { AlertService } from 'src/app/services/alert.service';
import { ObservacionesPage } from '../observaciones/observaciones.page';

@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.page.html',
  styleUrls: ['./datos-solicitud.page.scss'],
})
export class DatosSolicitudPage implements OnInit {

  @Input() codigo;
  @Input() i;
  orden;
  servicios;
  tecnicos;
  viewEntered = false;
  recharge;
  longitude;
  latitude;
  fechaHora;

  constructor( private platform: Platform, private modalController: ModalController, public loadingController: LoadingController,
               private callNumber: CallNumber, private geolocation: Geolocation, private disatelService: DisatelService,
               private alertService: AlertService) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await (await this.disatelService.getOrdenTrabajo(this.codigo)).subscribe(async (resp: any) => {
      this.orden = await resp.data[0];
      console.log(this.orden);
    });
    await (await this.disatelService.geServicios(this.codigo)).subscribe(async (respo: any) => {
      this.servicios = await respo.data;
      console.log(this.servicios);
    });
    await (await this.disatelService.geTecnicos(this.codigo)).subscribe(async (respon: any) => {
      this.tecnicos = await respon.data;
      console.log(this.tecnicos);
    });
    setTimeout(() => {
      this.viewEntered = true;
    }, 500);
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  async back(){
    this.recharge = false;
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss(this.recharge);
    });
    this.modalController.dismiss(this.recharge);
  }

  async mostrarModalEquipo( equipo ) {
    await this.presentLoading();
    const modal = await this.modalController.create({
      component: VerDatosPage,
      backdropDismiss: false,
      componentProps: { equipo }
    });
    await modal.present();
  }

  async mostrarModalSim( sim ) {
    await this.presentLoading();
    const modal = await this.modalController.create({
      component: VerSIMPage,
      backdropDismiss: false,
      componentProps: { sim }
    });
    await modal.present();
  }

  async mostrarModalObservaciones( observaciones ) {
    await this.presentLoading();
    const modal = await this.modalController.create({
      component: ObservacionesPage,
      backdropDismiss: false,
      componentProps: { observaciones }
    });
    await modal.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  async mostrarModal( vehiculo, ind ) {
      await this.presentLoading();
      const ordenEspecifica = this.orden;
      const i = this.i;
      const modal = await this.modalController.create({
        component: VerVehiculoPage,
        backdropDismiss: false,
        componentProps: { vehiculo, ordenEspecifica, ind, i }
      });
      await modal.present();
  }

  onClick(numeros){
    this.callNumber.callNumber(numeros, true);
  }

  async location(){
    await this.presentLoading();
    await this.getPosition();
    this.fechaHora = await this.getDate() + ' ' + this.getHour();
    setTimeout(async () => {
      if (this.longitude !== null && this.latitude !== null && this.latitude !== undefined && this.longitude !== undefined){
        await (await this.disatelService.presenteCliente(this.orden.codigo, ' ', this.fechaHora, this.longitude, this.latitude)).
        subscribe(resp => {
          console.log(resp);
        });
        this.recharge = await true;
        this.alertService.presentToast('Se han enviando las coordenadas. Espere mientras le aprueban su solicitud.', 'success', 7000);
        this.modalController.dismiss(this.recharge);
        this.loadingController.dismiss();
      }else{
        this.recharge = await true;
        this.alertService.presentToast('Ha ocurrido un error con sus cordenadas, inténtelo de nuevo', 'danger', 7000);
        this.modalController.dismiss(this.recharge);
        this.loadingController.dismiss();
      }
    }, 4000);
  }

  getPosition(){
    this.geolocation.getCurrentPosition().then(async (resp) => {
      this.latitude = await resp.coords.latitude;
      this.longitude = await resp.coords.longitude;
    }).catch((error) => {
      this.alertService.presentToast(error, 'danger', 3000);
    });
  }

  getDate(){
    let todayDate;
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    todayDate = dd + '/' + mm + '/' + yyyy;
    return todayDate;
  }

  getHour(){
    const hoy = new Date();
    const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    return hora;
  }

}
