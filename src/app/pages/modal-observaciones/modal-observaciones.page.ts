import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { DisatelService } from '../../services/disatel.service';
import { Platform } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-modal-observaciones',
  templateUrl: './modal-observaciones.page.html',
  styleUrls: ['./modal-observaciones.page.scss'],
})
export class ModalObservacionesPage implements OnInit {

  @Input() objDetalles;
  atras: boolean;
  fechaHora;
  observaciones = '';
  mustDoSalir;
  mustDoPresente;
  mustDoIniciar;
  mustDoFinalizar;
  mustDoCancelar;
  mustDoFallida;
  mustDoVehiculoFin;
  mustDoCancelarVeh;
  mustDoFallidoVeh;
  mustDoSelect;
  viewEntered;

  constructor(private modalController: ModalController, private disatelService: DisatelService,
              private loadingController: LoadingController, private platform: Platform, private alertService: AlertService) { }

  ionViewDidEnter() {
    this.viewEntered = true;
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }


  ngOnInit() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 400);
  }

  async back(){
    this.atras = true;
    const objeto = await {
    atras : this.atras
    };
    this.platform.backButton.subscribeWithPriority(10, () => {
    this.modalController.dismiss(objeto);
    });
    this.modalController.dismiss(objeto);
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  async method(){
    if (this.observaciones !== '' ){
      await this.presentLoading();
      this.fechaHora = this.getDate() + ' ' + this.getHour();
      this.atras = false;
      const isOnLine = navigator.onLine;
      if (this.objDetalles.titulo === 'Salir de sede'){
        if (isOnLine){
          (await this.disatelService.ejecutarOT(this.objDetalles.orden.codigo, this.observaciones, this.fechaHora)).subscribe(resp => {
            console.log(resp);
          });
          this.mustDoSalir = '';
        }else{
          this.mustDoSalir = 'salir';
        }
        this.objDetalles.orden.status_codigo = 5;
        this.objDetalles.orden.status_texto = 'En proceso';
        const objeto = await {
          ordenModificada : this.objDetalles.orden,
          atras : this.atras,
          fechaHora: this.fechaHora,
          observaciones: this.observaciones,
          vehiculo: 'none',
          service: this.mustDoSalir
        };
        this.modalController.dismiss(objeto);
      }else if (this.objDetalles.titulo === 'Presente en ubicación'){
        if (isOnLine){
          // (await this.disatelService.presenteCliente(this.objDetalles.orden.codigo, this.observaciones, this.fechaHora))
          // .subscribe(resp => {
          //  console.log(resp);
          // });
          this.mustDoPresente = '';
        }else{
          this.mustDoPresente = 'presente';
        }
        this.objDetalles.orden.status_codigo = 6;
        this.objDetalles.orden.status_texto = 'Completada';
        const objetoPresente = await {
          ordenModificadaPresente : this.objDetalles.orden,
          atras : this.atras,
          fechaHora: this.fechaHora,
          observaciones: this.observaciones,
          vehiculo: 'none',
          service: this.mustDoPresente
        };
        this.modalController.dismiss(objetoPresente);
      }else if (this.objDetalles.titulo === 'Iniciar trabajo'){
        if (isOnLine){
          (await this.disatelService.iniciarVehículo(this.objDetalles.orden.codigo,
                                              this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].codigo, this.observaciones,
                                              this.fechaHora)).subscribe(resp => {
                                                console.log(resp);
                                              });
          this.mustDoIniciar = '';
        }else{
          this.mustDoIniciar = 'iniciar';
        }
        this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].situacion_trabajo = 2;
        this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].color_status = '--background: #D6EAF8;';
        const objetoIniciado = await {
          ordenModificadaIniciado : this.objDetalles.orden,
          atras : this.atras,
          fechaHora: this.fechaHora,
          observaciones: this.observaciones,
          vehiculo: this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].codigo,
          service: this.mustDoIniciar
        };
        this.modalController.dismiss(objetoIniciado);
      }else if (this.objDetalles.titulo === 'Finalizar orden'){
        if (isOnLine){
          (await this.disatelService.finalizarOrden(this.objDetalles.orden.codigo, this.observaciones, this.fechaHora)).subscribe(res => {
            console.log(res);
          });
          this.mustDoFinalizar = '';
        }else{
          this.mustDoFinalizar = 'Finalizar';
        }
        this.objDetalles.orden.status_codigo = 10;
        const objetoPresente = await {
          atras : this.atras,
          ordenModificadaIniciado : this.objDetalles.orden,
          fechaHora: this.fechaHora,
          observaciones: this.observaciones,
          vehiculo: 'none',
          service: this.mustDoFinalizar
        };
        this.modalController.dismiss(objetoPresente);
      }else if (this.objDetalles.titulo === 'Cancelar orden'){
        if (isOnLine){
          (await this.disatelService.ordenCancelada(this.objDetalles.orden.codigo, this.observaciones, this.fechaHora)).subscribe(resp => {
            console.log(resp);
          });
          this.mustDoCancelar = '';
        }else{
          this.mustDoCancelar = 'Cancelar';
        }
        this.objDetalles.orden.status_codigo = 10;
        const objetoCancelado = await {
          atras : this.atras,
          ordenModificada: this.objDetalles.orden,
          fechaHora: this.fechaHora,
          observaciones: this.observaciones,
          vehiculo: 'none',
          service: this.mustDoCancelar
        };
        this.modalController.dismiss(objetoCancelado);
      }else if (this.objDetalles.titulo === 'Orden fallida'){
        if (isOnLine){
          (await this.disatelService.ordenFallida(this.objDetalles.orden.codigo, this.observaciones, this.fechaHora)).subscribe(resp => {
            console.log(resp);
          });
          this.mustDoFallida = '';
        }else{
          this.mustDoFallida = 'Fallida';
        }
        this.objDetalles.orden.status_codigo = 10;
        const objetoFallido = await {
          atras : this.atras,
          ordenModificada: this.objDetalles.orden,
          fechaHora: this.fechaHora,
          observaciones: this.observaciones,
          vehiculo: 'none',
          service: this.mustDoFallida
        };
        this.modalController.dismiss(objetoFallido);
      }else if (this.objDetalles.titulo === 'Finalizar vehiculo'){
        if (isOnLine){
          (await this.disatelService.finalizarVehículo(this.objDetalles.orden.codigo,
            this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].codigo, this.observaciones,
            this.fechaHora, this.objDetalles.Recibe)).subscribe(resp => {
                                                  console.log(resp);
                                                });
          this.mustDoVehiculoFin = '';
        }else{
          this.mustDoVehiculoFin = 'Finalizar vehiculo';
        }
        this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].situacion_trabajo = 5;
        this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].color_status = '--background: #D5F5E3;';
        const objetoFin = await {
          ordenModificadaIniciado : this.objDetalles.orden,
          atras : this.atras,
          fechaHora: this.fechaHora,
          observaciones: this.observaciones,
          vehiculo: this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].codigo,
          service: this.mustDoVehiculoFin
        };
        this.modalController.dismiss(objetoFin);
      }else if (this.objDetalles.titulo === 'Cancelar vehiculo'){
        if (isOnLine){
          (await this.disatelService.cancelarVehículo(this.objDetalles.orden.codigo,
            this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].codigo, this.observaciones,
            this.fechaHora)).subscribe(resp => {
                                                  console.log(resp);
                                                });
          this.mustDoCancelarVeh = '';
        }else{
          this.mustDoCancelarVeh = 'Cancelar vehiculo';
        }
        this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].situacion_trabajo = 0;
        this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].color_status = '--background: #FCF3CF;';
        const objetoCancelVeh = await {
          ordenModificadaIniciado : this.objDetalles.orden,
          atras : this.atras,
          fechaHora: this.fechaHora,
          observaciones: this.observaciones,
          vehiculo: this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].codigo,
          service: this.mustDoCancelarVeh
        };
        this.modalController.dismiss(objetoCancelVeh);
      }else if (this.objDetalles.titulo === 'Vehiculo fallido'){
        if (isOnLine){
          (await this.disatelService.fallidoVehículo(this.objDetalles.orden.codigo,
            this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].codigo, this.observaciones,
            this.fechaHora)).subscribe(resp => {
                                                  console.log(resp);
                                                });
          this.mustDoFallidoVeh = '';
        }else{
          this.mustDoFallidoVeh = 'Vehiculo fallido';
        }
        this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].situacion_trabajo = 10;
        this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].color_status = '--background: #F5B7B1;';
        const objetoFallidoVeh = await {
          ordenModificadaIniciado : this.objDetalles.orden,
          atras : this.atras,
          fechaHora: this.fechaHora,
          observaciones: this.observaciones,
          vehiculo: this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].codigo,
          service: this.mustDoFallidoVeh
        };
        this.modalController.dismiss(objetoFallidoVeh);
      }else if (this.objDetalles.titulo === 'Asegurar'){
        (await this.disatelService.solicitarAseguramiento(this.objDetalles.orden.codigo, this.observaciones, this.fechaHora)).
          subscribe(resp => {
            console.log(resp);
          });
        const x = true;
        this.modalController.dismiss(x);
      }
    }else{
      this.alertService.presentAlert('El campo de observaciones es obligatorio.');
    }
  }

}
