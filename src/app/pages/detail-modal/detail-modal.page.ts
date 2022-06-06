import { ObservacionesPage } from './../observaciones/observaciones.page';
import { ConstanciaVisitaPage } from './../constancia-visita/constancia-visita.page';
import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { VerVehiculoPage } from '../ver-vehiculo/ver-vehiculo.page';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { VerDatosPage } from '../ver-datos/ver-datos.page';
import { VerSIMPage } from '../ver-sim/ver-sim.page';
import { ModalObservacionesPage } from '../modal-observaciones/modal-observaciones.page';
import { Storage } from '@ionic/storage';
import { DisatelService } from '../../services/disatel.service';
import { AlertService } from '../../services/alert.service';
import { Platform } from '@ionic/angular';
import pusherJs from 'pusher-js';
import { Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.page.html',
  styleUrls: ['./detail-modal.page.scss'],
})
export class DetailModalPage implements OnInit {

  @Input() codigo;
  @Input() i;

  orden;
  servicios;
  tecnicos;
  recharge: boolean;
  x = false;
  fecha;
  hora;
  fotos = [];
  photo;
  mostrarFoto = false;
  photoFile = null;
  photosFile = [];
  photosUploaded = [];
  sended;
  viewEntered = false;
  objFile;
  asegurado = false;
  ordenes = [];
  ORD;
  finalizar = false;
  mostrar = true;

  pusher = new pusherJs('cd3beb6f8460652f2cc2', {
    cluster: 'us2'
  });
  channel = this.pusher.subscribe('disatel-gt');
  notificaciones;


  async ionViewDidEnter() {
    // setTimeout(() => {
    //  this.viewEntered = true;
    // }, 20000);
  }

  async ionViewWillEnter(){
    await (await this.disatelService.getOrdenTrabajo(this.codigo)).subscribe(async (resp: any) => {
      this.orden = await resp.data[0];
      console.log(this.orden);
      setTimeout(() => {
        this.viewEntered = true;
      }, 1000);
      let cont = 0;
      await this.orden.vehiculos.forEach(ele => {
        if (ele.situacion_trabajo === 5 || ele.situacion_trabajo === 10 || ele.situacion_trabajo === 0){
          cont = cont + 1;
        }
      });
      setTimeout(async () => {
        this.ORD = await this.ordenes[this.i];
      }, 2000);
      setTimeout(async () => {
        if ( this.orden.vehiculos.length === cont ) {
          this.finalizar = await true;
        }
        if (this.ORD.status_codigo === 9){
          this.mostrar = await false;
        }
      }, 500);
    });
    await (await this.disatelService.geServicios(this.codigo)).subscribe(async (respo: any) => {
      this.servicios = await respo.data;
      console.log(this.servicios);
    });
    await (await this.disatelService.geTecnicos(this.codigo)).subscribe(async (respon: any) => {
      this.tecnicos = await respon.data;
      console.log(this.tecnicos);
    });
    const datosUsuario = await this.storage.get('datos');
    await (await this.disatelService.getOrdenesTrabajo(datosUsuario.codigo)).subscribe(async (resp: any) => {
      this.ordenes = await resp.data;
    });
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  constructor(private modalController: ModalController, private callNumber: CallNumber, private storage: Storage,
              public loadingController: LoadingController, private disatelService: DisatelService, private alertService: AlertService,
              private platform: Platform, public toastController: ToastController, private router: Router,
              private vibration: Vibration) {

                this.channel.bind('aseguramiento-socket', async (data) => {
                  const datosUsuario = await this.storage.get('datos');
                  await data.usuarios.forEach(async element => {
                    if (element.usuario === datosUsuario.codigo){
                      const toast = await this.toastController.create({
                        header: data.titulo,
                        message: data.mensaje,
                        position: 'top',
                        color: 'dark',
                        duration: 6000
                      });
                      await toast.present();
                      this.vibration.vibrate(1000);
                      // this.modalController.dismiss(data.titulo);
                      this.asegurado = true;
                      this.ORD.status_codigo = await 9;
                    }
                  });
                });
  }

  async ngOnInit() {
    this.loadingController.dismiss();
  }

  async back(){
    this.recharge = false;
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss(this.recharge);
    });
    this.modalController.dismiss(this.recharge);
  }

  onClick(numeros){
    this.callNumber.callNumber(numeros, true);
  }

  async asegurar(){
    const objDetalles = await {
      titulo:  'Asegurar',
      icon:  'checkbox',
      orden:  this.orden
    };
    const modal = await this.modalController.create({
      component: ModalObservacionesPage,
      cssClass: 'with-top',
      componentProps: { objDetalles }
    });
    await modal.present();

    const value: any = await modal.onDidDismiss();
    if (value.data === true){
      this.loadingController.dismiss();
      this.ORD.status_codigo = await 8;
      this.asegurado = await false;
      this.mostrar = false;
    }
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

      const value: any = await modal.onDidDismiss();
      let cont = 0;
      await this.orden.vehiculos.forEach(ele => {
        if (ele.situacion_trabajo === 5 || ele.situacion_trabajo === 10 || ele.situacion_trabajo === 0){
          cont = cont + 1;
        }
      });
      if ( this.orden.vehiculos.length === cont ) {
        this.finalizar = await true;
      }
      if (value.data === true){
        this.viewEntered = await false;
        const datosUsuario = await this.storage.get('datos');
        await (await this.disatelService.getOrdenesTrabajo(datosUsuario.codigo)).subscribe(async (resp: any) => {
          this.ordenes = await resp.data;
        });
        setTimeout(async () => {
          this.ORD = await this.ordenes[this.i];
        }, 700);
        setTimeout(() => {
          this.viewEntered = true;
        }, 1000);
        if (this.ORD.status_codigo === 9){
          this.mostrar = false;
        }
      }
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

  async finalizarOrden() {
    let cont = 0;
    await this.orden.vehiculos.forEach(ele => {
      if (ele.situacion_trabajo === 5 || ele.situacion_trabajo === 10 || ele.situacion_trabajo === 0){
        cont = cont + 1;
      }
    });

    if ( this.orden.vehiculos.length === cont ) {
      await this.presentLoading();
      const orden = this.orden;
      const modal = await this.modalController.create({
        component: ConstanciaVisitaPage,
        componentProps: { orden }
      });
      await modal.present();

      const value: any = await modal.onDidDismiss();
      if (value.data === true){
        this.alertService.presentToast('Orden finalizada con éxito', 'success', 2000);
        this.recharge = true;
        setTimeout(() => {
          this.modalController.dismiss(this.recharge);
        }, 500);
      }
    } else {
      this.alertService.presentAlert('Para finalizar una orden, debe de haber finalizado todos los trabajos con los vehículos');
    }

}

async cancelarOrden() {
  await this.presentLoading();
  const objDetalles = await {
    titulo: 'Cancelar orden',
    icon: 'close-circle',
    orden: this.orden
  };
  const modal = await this.modalController.create({
    component: ModalObservacionesPage,
    cssClass: 'with-top',
    componentProps: { objDetalles }
  });
  await modal.present();

  const value: any = await modal.onDidDismiss();
  if (value.data.atras === false){
    this.orden = value.data.ordenModificada;
    this.loadingController.dismiss();
    this.alertService.presentToast('Orden cancelada con éxito', 'warning', 2000);
    this.recharge = true;
    setTimeout(() => {
      this.modalController.dismiss(this.recharge);
    }, 500);
  }else{
  }
}

async ordenFallida() {
  await this.presentLoading();
  const objDetalles = await {
    titulo: 'Orden fallida',
    icon: 'close-circle-outline',
    orden: this.orden
  };
  const modal = await this.modalController.create({
    component: ModalObservacionesPage,
    cssClass: 'with-top',
    componentProps: { objDetalles }
  });
  await modal.present();

  const value: any = await modal.onDidDismiss();
  if (value.data.atras === false){
    this.orden = value.data.ordenModificada;
    this.loadingController.dismiss();
    this.alertService.presentToast('Orden fallida', 'danger', 2000);
    this.recharge = true;
    setTimeout(() => {
      this.modalController.dismiss(this.recharge);
    }, 500);
  }
}

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

}
