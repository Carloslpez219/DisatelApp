import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ModalObservacionesPage } from '../modal-observaciones/modal-observaciones.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DisatelService } from '../../services/disatel.service';
import { AlertService } from '../../services/alert.service';
import { UbicacionEquipoPage } from '../ubicacion-equipo/ubicacion-equipo.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Platform } from '@ionic/angular';
import pusherJs from 'pusher-js';
import { TituloPage } from '../titulo/titulo.page';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-trabajar-vehiculo',
  templateUrl: './trabajar-vehiculo.page.html',
  styleUrls: ['./trabajar-vehiculo.page.scss'],
})
export class TrabajarVehiculoPage implements OnInit {

  @Input() vehiculoTrabajando;
  @Input() ordenEspe;
  @Input() index;
  @Input() ind;
  atras: boolean;
  fechaHora;
  objVehiculo;
  equipo;
  fotos = [];
  mostrarFoto = false;
  photoFile = null;
  photosFile = [];
  photo;
  canSelectSim = false;
  sim;
  sended: boolean;
  viewEntered;
  equipoValue;
  simValue = 866;
  objFile;
  photosUploaded = [];
  pruebas = false;
  pusher = new pusherJs('cd3beb6f8460652f2cc2', {
    cluster: 'us2'
  });
  channel = this.pusher.subscribe('disatel-gt');
  recibe = ' ';

  ionViewDidEnter() {
    this.viewEntered = true;
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  constructor(private modalController: ModalController, private storage: Storage,
              private disatelService: DisatelService, private alertService: AlertService, private loadingController: LoadingController,
              private camera: Camera, private platform: Platform, public toastController: ToastController,
              private barcodeScanner: BarcodeScanner, private vibration: Vibration) {
    this.atras = true;
    this.channel.bind('pruebas-ot-socket', async (data) => {
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
            this.vibration.vibrate(1000);
            await toast.present();
            this.vehiculoTrabajando.situacion_trabajo = 4;
          }
        });
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000);
  }

  async back(){
    this.atras = true;
    this.platform.backButton.subscribeWithPriority(10, () => {
    this.modalController.dismiss(this.atras);
    });
    this.modalController.dismiss(this.atras);
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

  async onClick(){
    this.barcodeScanner.scan().then(async barcodeData => {
      if (barcodeData.cancelled){
        this.equipoValue = null;
        this.alertService.presentToast('El equipo no ha sido seleccionado', 'dark', 2000);
        this.canSelectSim = false;
      }else{
        this.atras = false;
        this.equipo = barcodeData;
        const objDetails = {
          index: this.index,
          ind: this.ind,
          equipo: this.equipo
        };
        const objDetalles = {
          titulo: 'Seleccionar equipo',
          icon: 'list-circle',
          orden: this.ordenEspe,
          obj: objDetails
        };
        const modal = await this.modalController.create({
          component: UbicacionEquipoPage,
          backdropDismiss: false,
          cssClass: 'with-top',
          componentProps: { objDetalles }
        });
        await modal.present();

        const value: any = await modal.onDidDismiss();
        if (value.data.atras === false){
          this.ordenEspe = value.data.ordenModificadaIniciado;
          this.canSelectSim = true;
          this.simValue = value.data.sim;
          this.alertService.presentToast('Equipo seleccionado con éxito', 'dark', 2000);
        }else{
          this.equipoValue = null;
          this.alertService.presentToast('El equipo no ha sido seleccionado', 'dark', 2000);
          this.canSelectSim = false;
        }
      }
    }).catch(err => {
        this.alertService.presentToast(err, 'dark', 2000);
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  async iniciarTrabajo(){
    await this.presentLoading();
    this.atras = false;
    const objDetails = {
      index: this.index,
      ind: this.ind,
    };
    const objDetalles = {
      titulo: 'Iniciar trabajo',
      icon: 'clock',
      orden: this.ordenEspe,
      obj: objDetails
    };
    const modal = await this.modalController.create({
      component: ModalObservacionesPage,
      cssClass: 'with-top',
      componentProps: { objDetalles }
    });
    await modal.present();

    const value: any = await modal.onDidDismiss();
    if (value.data.atras === false){
      this.ordenEspe = value.data.ordenModificadaIniciado;
      this.loadingController.dismiss();
      this.alertService.presentToast('Vehículo iniciado con éxito', 'dark', 2000);
    }else{
    }
  }


  async solicitarPruebas(){
    this.vehiculoTrabajando.situacion_trabajo = 3;
    this.fechaHora = await this.getDate() + ' ' + this.getHour();
    (await this.disatelService.solicitarPruebas(this.ordenEspe.codigo, this.vehiculoTrabajando.codigo, this.fechaHora)).subscribe(resp => {
      console.log(resp);
    });
  }

  async finalizarTrabajo(){
    await this.presentLoading();
    this.atras = false;
    const objDetails = {
      index: this.index,
      ind: this.ind,
    };
    const objDetalles = {
      titulo: 'Finalizar vehiculo',
      icon: 'checkbox',
      orden: this.ordenEspe,
      obj: objDetails,
      Recibe: this.recibe
    };
    const modal = await this.modalController.create({
      component: ModalObservacionesPage,
      componentProps: { objDetalles },
      cssClass: 'with-top'
    });
    await modal.present();

    const value: any = await modal.onDidDismiss();
    if (value.data.atras === false){
      this.vehiculoTrabajando.situacion_trabajo = 5;
      this.ordenEspe = value.data.ordenModificadaIniciado;
      this.loadingController.dismiss();
      this.alertService.presentToast('Vehículo finalizado con éxito', 'success', 2000);
    }else{
    }
  }

  async cancelarTrabajo(){
    await this.presentLoading();
    this.atras = false;
    const objDetails = {
      index: this.index,
      ind: this.ind,
    };
    const objDetalles = {
      titulo: 'Cancelar vehiculo',
      icon: 'close-circle',
      orden: this.ordenEspe,
      obj: objDetails
    };
    const modal = await this.modalController.create({
      component: ModalObservacionesPage,
      cssClass: 'with-top',
      componentProps: { objDetalles }
    });
    await modal.present();

    const value: any = await modal.onDidDismiss();
    if (value.data.atras === false){
      this.loadingController.dismiss();
      this.vehiculoTrabajando.situacion_trabajo = 0;
      this.alertService.presentToast('Vehículo cancelado con éxito', 'warning', 2000);
    }else{
    }
  }

  async trabajoFallido(){
    await this.presentLoading();
    this.atras = false;
    const objDetails = {
      index: this.index,
      ind: this.ind,
    };
    const objDetalles = {
      titulo: 'Vehiculo fallido',
      icon: 'close-circle-outline',
      orden: this.ordenEspe,
      obj: objDetails
    };
    const modal = await this.modalController.create({
      component: ModalObservacionesPage,
      cssClass: 'with-top',
      componentProps: { objDetalles }
    });
    await modal.present();

    const value: any = await modal.onDidDismiss();
    if (value.data.atras === false){
      this.loadingController.dismiss();
      this.vehiculoTrabajando.situacion_trabajo = 10;
      this.alertService.presentToast('Vehículo fallido', 'danger', 2000);
    }else{
    }
  }

  async seleccionarEquipo(event){
    this.atras = false;
    this.equipo = await event.detail.value;
    const objDetails = {
      index: this.index,
      ind: this.ind,
      equipo: this.equipo
    };
    const objDetalles = {
      titulo: 'Seleccionar equipo',
      icon: 'list-circle',
      orden: this.ordenEspe,
      obj: objDetails
    };
    const modal = await this.modalController.create({
      component: UbicacionEquipoPage,
      backdropDismiss: false,
      cssClass: 'with-top',
      componentProps: { objDetalles }
    });
    await modal.present();

    const value: any = await modal.onDidDismiss();
    if (value.data.atras === false){
      this.ordenEspe = value.data.ordenModificadaIniciado;
      this.canSelectSim = true;
      this.simValue = value.data.sim;
      this.alertService.presentToast('Equipo seleccionado con éxito', 'dark', 2000);
    }else{
      this.equipoValue = null;
      this.alertService.presentToast('El equipo no ha sido seleccionado', 'dark', 2000);
      this.canSelectSim = false;
    }
  }

  async seleccionarSim(event){
    if ( this.canSelectSim === true ){
      this.fechaHora = this.getDate() + ' ' + this.getHour();
      this.sim = await event.detail.value;
      const isOnLine = navigator.onLine;
      if (isOnLine){
        (await this.disatelService.seleccionarSim(this.ordenEspe.codigo, this.vehiculoTrabajando.codigo, this.sim, this.fechaHora,
                                                  this.equipo))
        .subscribe((resp: any) => {
            this.alertService.presentToast('Sim seleccionada con éxito', 'dark', 2000);
        });
      }else{
        this.alertService.presentToast('Actualmente no cuenta con una conexión a internet. Intente de nuevo más tarde.', 'danger', 2000);
      }
    }else{
      this.alertService.presentAlert('Para seleccionar una SIM primero debes de elegir a que equipo se le aignará.');
      this.simValue = null;
    }
  }

  dataURLtoFile(dataurl, filename) {
    // tslint:disable-next-line: one-variable-per-declaration
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  async takePicture() {
    const options: CameraOptions = {
      quality: 70,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit: false
    };

    this.camera.getPicture(options).then(async (imageData) => {
    const base64Image = 'data:image/jpeg;base64,' + imageData;
    this.photo = base64Image;

    const modal = await this.modalController.create({
      component: TituloPage,
      cssClass: 'width-height2',
      componentProps: { tit: '' }
    });
    await modal.present();

    const value: any = await modal.onDidDismiss();
    if (value) {
      this.photoFile = this.dataURLtoFile(this.photo, 'foto');
      this.fotos.push(this.photo);
      this.objFile = {
        file: this.photoFile,
        titulo: value.data
      };
      this.photosFile.push(this.objFile);
      this.mostrarFoto = true;
    }

    }, (err) => {
      console.log(err);
    });
  }

  openGallery() {
    const galleryOptions: CameraOptions = {
      quality: 70,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit: false
      };

    this.camera.getPicture(galleryOptions).then(async (imgData) => {
      const base64Image = 'data:image/jpeg;base64,' + imgData;
      this.photo = base64Image;

      const modal = await this.modalController.create({
        component: TituloPage,
        cssClass: 'width-height2',
        componentProps: { tit: '' }
      });
      await modal.present();

      const value: any = await modal.onDidDismiss();
      if (value) {
        this.photoFile = this.dataURLtoFile(this.photo, 'foto');
        this.fotos.push(this.photo);
        this.objFile = {
          file: this.photoFile,
          titulo: value.data
        };
        this.photosFile.push(this.objFile);
        this.mostrarFoto = true;
      }

      }, (err) => {
        console.log(err);
      });
    }

    deletePhotoArray(index){
      this.fotos.splice(index, 1);
      this.photosFile.splice(index, 1);
    }

    async subirImagenes(){
      await this.presentLoading();
      const isOnLine = navigator.onLine;
      if (isOnLine){
        this.photosFile.forEach(async (element) => {
          (await this.disatelService.postFotoVehiculo(this.ordenEspe.codigo, this.vehiculoTrabajando.codigo, element.file, element.titulo))
            .subscribe(resp => {
              console.log(resp);
            });
        });
        this.fotos.forEach(ele => {
          this.photosUploaded.push(ele);
        });
        this.photosFile = [];
        this.fotos = [];
        this.mostrarFoto = false;
      }else{
        this.alertService.presentToast('Actualmente no cuenta con una conexión a internet. Intente de nuevo más tarde', 'danger', 200);
      }
      this.loadingController.dismiss();
      await this.alertService.presentToast('La(s) imágen(es) fueron enviadas al servidor', 'success', 3000);
    }

}
