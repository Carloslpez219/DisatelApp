import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { DisatelService } from '../../services/disatel.service';
import { LucesCkecklistPage } from '../luces-ckecklist/luces-ckecklist.page';
import { InteriorCkecklistPage } from '../interior-ckecklist/interior-ckecklist.page';
import { GeneralCkecklistPage } from '../general-ckecklist/general-ckecklist.page';
import { ModalSignPage } from '../modal-sign/modal-sign.page';
import { SignaturePad } from 'angular2-signaturepad';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { TrabajarVehiculoPage } from '../trabajar-vehiculo/trabajar-vehiculo.page';
import { AlertService } from '../../services/alert.service';
import { ActionSheetController } from '@ionic/angular';
import { ModalObservacionesPage } from '../modal-observaciones/modal-observaciones.page';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {

  @Input() orden;
  @Input() i;
  @Input() vehiculo;
  @Input() vehiculoTrabajando;
  @Input() ordenEspe;
  @Input() index;
  @Input() ind;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  interirores = [];
  viewEntered;
  viewEntered2 = false;
  luces = [];
  interior = [];
  general = [];
  values = [];
  signaturePadOptions = {
    minWidth: 1,
    canvasWidth: 300,
    canvasHeight: 200,
    cancelable : false,
    backgroundColor : '#F7F7F6'
  };
  signFile = null;
  mostrarFirma = false;
  signature;
  recharhe;
  photo;
  fotos = Array(6);
  mostrarFoto = [false, false, false, false, false, false];
  photoFile = null;
  photosFile = Array(6);
  resultado = [];
  luc;
  gen;
  int;
  default = [];
  default1 = [];
  default2 = [];
  titulos;
  contador = 0;
  recibe = ' ';
  fechaHora;

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

  constructor(private disatelService: DisatelService, private camera: Camera, private platform: Platform,
              private modalController: ModalController, private loadingController: LoadingController,
              private alertService: AlertService, public actionSheetController: ActionSheetController) {
              }

  async ngOnInit() {
    (await this.disatelService.getInterirores()).subscribe(async (resp: any) => {
      this.interirores = await resp.data;
    });
    (await this.disatelService.getTitulosImagenes()).subscribe(async (resp: any) => {
      this.titulos = await resp.data;
    });
  }

  async presentActionSheet(i) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Foto',
      buttons: [{
        text: 'Cancelar',
        role: 'destructive',
        icon: 'trash'
      }, {
        text: 'Camara',
        icon: 'camera',
        handler: () => {
          this.takePicture(i);
        }
      }, {
        text: 'Galería',
        icon: 'image',
        handler: () => {
          this.openGallery(i);
        }
      }]
    });
    await actionSheet.present();
  }

  async back(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss(this.recharhe);
    });
    this.modalController.dismiss(this.recharhe);
  }

  async mostrarModalLuces() {
    const Luces = this.interirores[0];
    for (let index = 0; index < 7; index++) {
      const x = [Luces[index], '3'];
      this.default.push(x);
    }
    const lcs = this.default;
    const modal = await this.modalController.create({
      component: LucesCkecklistPage,
      backdropDismiss: false,
      componentProps: { lcs }
    });
    await modal.present();

    const value: any = await modal.onDidDismiss();
    this.luces = value.data;
  }

  async mostrarModalInterior() {
    const interiores = this.interirores[1];
    for (let index = 0; index < 16; index++) {
      const x = [interiores[index], '3'];
      this.default1.push(x);
    }
    const itrs = this.default1;
    const modal = await this.modalController.create({
      component: InteriorCkecklistPage,
      backdropDismiss: false,
      componentProps: { itrs }
    });
    await modal.present();

    const value: any = await modal.onDidDismiss();
    this.interior = value.data;
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

  async mostrarModalGenral() {
    const general = this.interirores[2];
    for (let index = 0; index < 10; index++) {
      const x = [general[index], '3'];
      this.default2.push(x);
    }
    const grl = this.default2;
    const modal = await this.modalController.create({
      component: GeneralCkecklistPage,
      backdropDismiss: false,
      componentProps: { grl }
    });
    await modal.present();

    const value: any = await modal.onDidDismiss();
    this.general = value.data;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  async enviar(){
    await this.presentLoading();
    await this.luces.forEach(element => {
      this.resultado.push(element);
    });
    await this.interior.forEach(element => {
      this.resultado.push(element);
    });
    await this.general.forEach(element => {
      this.resultado.push(element);
    });

    if (0 === 0){

          setTimeout(async () => {
            this.fechaHora = await this.getDate() + ' ' + this.getHour();
            const x = JSON.stringify(this.resultado);
            await (await this.disatelService.setChecklist(x, this.orden.codigo, this.vehiculoTrabajando.codigo, this.recibe,
                  this.fechaHora))
            .subscribe(resp => {
              console.log(resp);
            });
            let contador = 0;
            this.photosFile.forEach(async element => {
              contador = await contador++;
              console.log(contador);
              await (await this.disatelService.postFotoChecklist(this.orden.codigo, this.vehiculoTrabajando.codigo, element,
                this.titulos[contador].codigo)).subscribe(resp => {
                      console.log(resp);
                    });
            });
            const vehiculoTrabajando = await this.vehiculoTrabajando;
            const ordenEspe = await this.orden;
            const index = await this.i;
            const ind = await this.ind;
            const modal = await this.modalController.create({
              component: TrabajarVehiculoPage,
              backdropDismiss: false,
              componentProps: { vehiculoTrabajando,  ordenEspe, index, ind}
            });
            await modal.present();

            const value: any = await modal.onDidDismiss();
            if (value) {
              console.log(value);
            }else{
              console.log('no data');
            }
          }, 2500);
    }else{
      await this.alertService.presentToast('Para enviar la lista debe llenar todos los campos', 'danger', 4000);
      this.loadingController.dismiss();
    }
  }

  async mostrarModalSign() {
    const modal = await this.modalController.create({
      component: ModalSignPage,
      cssClass: 'width-height2',
      backdropDismiss: false
    });
    await modal.present();

    const value: any = await modal.onDidDismiss();
    this.signature = value.data;
    this.signFile = await this.dataURLtoFile(this.signature, 'sign.jpeg');
    this.fotos.push(this.signFile);
    console.log(this.signFile);
    (await this.disatelService.postFotoChecklist(this.orden.codigo, this.vehiculoTrabajando.codigo, this.signFile, 10)).subscribe(resp =>{
      console.log(resp);
    });
    this.mostrarFirma = true;
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

async takePicture(i) {
  console.log(i);
  const options: CameraOptions = {
    quality: 70,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    allowEdit: false,
    correctOrientation: true
  };

  this.camera.getPicture(options).then(async (imageData) => {
  const base64Image = 'data:image/jpeg;base64,' + imageData;
  this.photo = base64Image;
  this.photoFile = await this.dataURLtoFile(this.photo, 'Foto');
  this.fotos[i] = this.photo;
  this.photosFile [i] = this.photoFile;
  this.mostrarFoto[i] = true;
  }, (err) => {
    console.log(err);
  });
}

openGallery(i) {
  const galleryOptions: CameraOptions = {
    quality: 70,
    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    destinationType: this.camera.DestinationType.DATA_URL,
    allowEdit: false,
    correctOrientation: true
    };

  this.camera.getPicture(galleryOptions).then(async (imgData) => {
    const base64Image = 'data:image/jpeg;base64,' + imgData;
    this.photo = base64Image;
    this.photoFile = await this.dataURLtoFile(this.photo, 'Foto');
    this.fotos[i] = this.photo;
    this.photosFile [i] = this.photoFile;
    this.mostrarFoto[i] = true;
    }, (err) => {
      console.log(err);
    });
  }

async trabajoFallido(){
  await this.presentLoading();
  const objDetails = await {
    index: this.index,
    ind: this.ind,
  };
  const objDetalles = await {
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
    setTimeout(() => {
      this.modalController.dismiss();
    }, 1000);
    this.alertService.presentToast('Vehículo fallido con éxito', 'danger', 2000);
  }else{
  }
}

async cancelarTrabajo(){
  await this.presentLoading();
  const objDetails = await {
    index: this.index,
    ind: this.ind,
  };
  const objDetalles = await {
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
    setTimeout(() => {
      this.modalController.dismiss();
    }, 1000);
    this.alertService.presentToast('Vehículo cancelado con éxito', 'warning', 2000);
  }else{
  }
}

}
