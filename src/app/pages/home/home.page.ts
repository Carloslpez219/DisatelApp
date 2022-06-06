import pusherJs from 'pusher-js';
import {
  Component, OnInit
} from '@angular/core';
import {
  AlertService
} from '../../services/alert.service';
import {
  Router
} from '@angular/router';
import {
  Storage
} from '@ionic/storage';
import {
  UserService
} from '../../services/user.service';
import {
  Data,
  RootObject
} from '../../interfaces/Data';
import {
  DisatelService
} from '../../services/disatel.service';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { DetailModalPage } from '../detail-modal/detail-modal.page';
import { Device } from '@ionic-native/device/ngx';
import { DatosSolicitudPage } from '../datos-solicitud/datos-solicitud.page';
import { Vibration } from '@ionic-native/vibration/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  skeletonScreen = Array(3);
  urlFoto: any;
  cardSkeleton: boolean;
  OrdenesDeTrabajo = [];
  noData: boolean;
  token: any;
  pusher = new pusherJs('cd3beb6f8460652f2cc2', {
    cluster: 'us2'
  });
  channel = this.pusher.subscribe('disatel-gt');
  notificaciones;
  ordenEspecifica;
  index;



  constructor(private router: Router, private userService: UserService, private storage: Storage, private alertService: AlertService,
              private disatelService: DisatelService, private modalController: ModalController,
              public loadingController: LoadingController, private device: Device,
              public toastController: ToastController, private vibration: Vibration) {
      this.cardSkeleton = true;
      this.noData = false;
      this.channel.bind('monitoreo-socket', async (data) => {
        console.log(data);
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
            this.vibration.vibrate(500);
            await this.presentLoading();
            await this.getData();
            await toast.present();
            this.openSpecificModal(data.ot);
          }
        });
      });
    }

  async ngOnInit() {
  }

  async openSpecificModal(ot){
    const x = ot.toString();
    await this.OrdenesDeTrabajo.forEach(element => {
      if (element.codigo === x){
        this.ordenEspecifica = element;
      }
    });

    const orden = this.ordenEspecifica;
    const i = await this.OrdenesDeTrabajo.indexOf(this.ordenEspecifica);
    const modal = await this.modalController.create({
      component: DetailModalPage,
      backdropDismiss: false,
      componentProps: { orden, i }
    });
    await modal.present();

    const value: any = await modal.onDidDismiss();
    if (value.data === true){
      this.cardSkeleton = true;
      this.noData = false;
      const datosUsuario = await this.storage.get('datos');
      if (datosUsuario){
        this.getOrdenesTrabajo( datosUsuario );
      }
    }
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Disatel',
      message: 'Tiene una nueva notificación...',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'arrow-forward-circle-outline',
          text: 'Ir',
          handler: () => {
            this.router.navigateByUrl('/notificaciones');
          }
        }, {
          text: 'cerrar',
          role: 'cancel',
          handler: () => {
            this.toastController.dismiss();
          }
        }
      ]
    });
    toast.present();
  }

  async ionViewWillEnter() {
    this.cardSkeleton = true;
    this.getData();
  }

async getData() {
    this.cardSkeleton = true;
    const datosUsuario = await this.storage.get('datos');
    if (datosUsuario) {
      (await this.userService.getFoto(datosUsuario.codigo)).subscribe((resp: Data) => {
        this.urlFoto = resp.data.url_foto;
        this.getOrdenesTrabajo(datosUsuario);
      });
    }
  }

async getOrdenesTrabajo < T >(datosUsuario) {
    if (datosUsuario) {
      (await this.disatelService.getOrdenesTrabajo(datosUsuario.codigo)).subscribe((resp: RootObject) => {
        this.OrdenesDeTrabajo = resp.data;
        console.log(this.OrdenesDeTrabajo);
        if (this.OrdenesDeTrabajo.length === 0){
          this.noData = true;
        }else{
          this.noData = false;
        }
        this.cardSkeleton = false;
      });
    }
  }

  async logOut(){
    await this.disatelService.quitarDispositivo(this.device.uuid, this.token);
    this.storage.remove('datos');
    this.router.navigateByUrl('/login');
  }

  async doRefresh(event){
    this.getData().then(() => {
      event.target.complete();
    });

  }

async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

async mostrarModal( codigo, i, status) {

    if (status === 4){
      const modal = await this.modalController.create({
        component: DatosSolicitudPage,
        backdropDismiss: false,
        componentProps: { codigo, i }
      });
      await modal.present();

      const value: any = await modal.onDidDismiss();
      if (value.data === true){
        this.cardSkeleton = true;
        this.noData = false;
        const datosUsuario = await this.storage.get('datos');
        if (datosUsuario){
          this.getOrdenesTrabajo( datosUsuario );
        }
      }
    }else if (status === 6 || status === 7 || status === 8 ||
      status === 9){
      const modal = await this.modalController.create({
        component: DetailModalPage,
        backdropDismiss: false,
        componentProps: { codigo, i }
      });
      await modal.present();

      const value: any = await modal.onDidDismiss();
      if (value.data === true){
        this.cardSkeleton = true;
        this.noData = false;
        const datosUsuario = await this.storage.get('datos');
        if (datosUsuario){
          this.getOrdenesTrabajo( datosUsuario );
        }
      }else if (value.data === false){

      }else{
        await this.presentLoading();
        await this.getData();
        this.openSpecificModal(value.data);
      }
    }else if (status === 5){
      this.alertService.presentToast('Usted ya presentó su ubicación. Espere mientras le aprueban su solicitud.', 'warning', 4000);
    }
  }

}
