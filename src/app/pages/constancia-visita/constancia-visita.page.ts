import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad';
import { ModalSignPage } from '../modal-sign/modal-sign.page';
import { DisatelService } from '../../services/disatel.service';

@Component({
  selector: 'app-constancia-visita',
  templateUrl: './constancia-visita.page.html',
  styleUrls: ['./constancia-visita.page.scss'],
})
export class ConstanciaVisitaPage implements OnInit {

  @Input() orden;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  viewEntered;
  reportado = ' ';
  encontrado = ' ';
  solucion = ' ';
  observacion = ' ';
  recibe = ' ';
  respuestas = ['No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No'];
  mostrarFirmaTecnico = false;
  mostrarFirmaEncargado = false;
  signFileTecnico = null;
  signFileEncargado = null;
  signatureEncargado;
  signatureTecnico;
  signaturePadOptions = {
    minWidth: 1,
    canvasWidth: 300,
    canvasHeight: 200,
    cancelable : false,
    backgroundColor : '#F7F7F6'
  };
  fechaHora;
  recharge = true;
  internas = ' ';

  ionViewDidEnter() {
    this.viewEntered = true;
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  constructor( private platform: Platform, private modalController: ModalController, private loadingController: LoadingController,
               private disatelService: DisatelService ) { }

  ngOnInit() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 1000);
  }

  async back(){
    this.platform.backButton.subscribeWithPriority(10, () => {
    this.modalController.dismiss();
    });
    this.modalController.dismiss();
  }

  async enviar(){
    await this.enviarCuestionario();
    await this.enviarObservaciones();
    this.modalController.dismiss(this.recharge);
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

  respuesta(ev, lugar){
    if (lugar === 'ubicacion'){
      if (ev.detail.checked === true){
        this.respuestas[0] = 'Si';
      }else{
        this.respuestas[0] = 'No';
      }
    }else if (lugar === 'temperatura'){
      if (ev.detail.checked === true){
        this.respuestas[1] = 'Si';
      }else{
        this.respuestas[1] = 'No';
      }
    }
    else if (lugar === 'panico'){
      if (ev.detail.checked === true){
        this.respuestas[2] = 'Si';
      }else{
        this.respuestas[2] = 'No';
      }
    }
    else if (lugar === 'combustible'){
      if (ev.detail.checked === true){
        this.respuestas[3] = 'Si';
      }else{
        this.respuestas[3] = 'No';
      }
    }
    else if (lugar === 'motor'){
      if (ev.detail.checked === true){
        this.respuestas[4] = 'Si';
      }else{
        this.respuestas[4] = 'No';
      }
    }
    else if (lugar === 'limitador'){
      if (ev.detail.checked === true){
        this.respuestas[5] = 'Si';
      }else{
        this.respuestas[5] = 'No';
      }
    }
    else if (lugar === 'inverso'){
      if (ev.detail.checked === true){
        this.respuestas[6] = 'Si';
      }else{
        this.respuestas[6] = 'No';
      }
    }
    else if (lugar === 'microfono'){
      if (ev.detail.checked === true){
        this.respuestas[7] = 'Si';
      }else{
        this.respuestas[7] = 'No';
      }
    }
    else if (lugar === 'alarma'){
      if (ev.detail.checked === true){
        this.respuestas[8] = 'Si';
      }else{
        this.respuestas[8] = 'No';
      }
    }
  }

  async mostrarModalSignEncargado() {
    const modal = await this.modalController.create({
      component: ModalSignPage,
      cssClass: 'width-height2',
      backdropDismiss: false
    });
    await modal.present();

    const value: any = await modal.onDidDismiss();
    this.signatureEncargado = value.data;
    this.signFileEncargado = this.dataURLtoFile(this.signatureEncargado, 'signEncargado.jpeg');
    (await this.disatelService.postFotoOrden(this.orden.codigo, this.signFileEncargado, 11))
    .subscribe(resp =>{
      console.log(resp);
    });
    this.mostrarFirmaEncargado = true;
  }

  async mostrarModalSignTecnico() {
    const modal = await this.modalController.create({
      component: ModalSignPage,
      cssClass: 'width-height2',
      backdropDismiss: false
    });
    await modal.present();

    const value: any = await modal.onDidDismiss();
    this.signatureTecnico = value.data;
    this.signFileTecnico = this.dataURLtoFile(this.signatureTecnico, 'signTecnico.png');
    this.mostrarFirmaTecnico = true;
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

  async enviarCuestionario(){
    await this.disatelService.cuestionarioVisita(this.respuestas, this.orden.codigo);
  }

  async enviarObservaciones(){
    this.fechaHora = await this.getDate() + ' ' + this.getHour();
    await (await this.disatelService.finalizaVisita(this.orden.codigo, this.reportado, this.encontrado, this.solucion,
      this.observacion, this.recibe, this.internas, this.fechaHora))
        .subscribe(resp =>{
          console.log(resp);
        });
  }

}
