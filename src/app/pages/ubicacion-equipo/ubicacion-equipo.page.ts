import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { DisatelService } from 'src/app/services/disatel.service';

@Component({
  selector: 'app-ubicacion-equipo',
  templateUrl: './ubicacion-equipo.page.html',
  styleUrls: ['./ubicacion-equipo.page.scss'],
})
export class UbicacionEquipoPage implements OnInit {

  @Input() objDetalles;
  atras: boolean;
  fechaHora;
  observaciones = ' ';
  mustDoSelect: string;
  viewEntered;
  SIM;

  ionViewDidEnter() {
    this.viewEntered = true;
  }

  ionViewWillLeave(){
    this.viewEntered = false;
  }

  constructor( private modalController: ModalController, private disatelService: DisatelService, private platform: Platform) { }

  ngOnInit() {
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

  async seleccionarEquipo(){
    this.fechaHora = this.getDate() + ' ' + this.getHour();
    this.atras = false;
    const isOnLine = navigator.onLine;
    if (isOnLine){
      (await this.disatelService.seleccionarEquipo(this.objDetalles.orden.codigo,
        this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].codigo,
        this.objDetalles.obj.equipo, this.fechaHora, this.observaciones)).subscribe( async (resp: any) => {
                                            this.SIM = await resp.sim;
                                            this.mustDoSelect = await '';
                                            const objetoSelect = await {
                                              ordenModificadaIniciado : this.objDetalles.orden,
                                              atras : this.atras,
                                              fechaHora: this.fechaHora,
                                              ubicacion: this.observaciones,
                                              vehiculo: this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].codigo,
                                              service: this.mustDoSelect,
                                              equipo: this.objDetalles.obj.equipo,
                                              sim: this.SIM
                                            };
                                            this.modalController.dismiss(objetoSelect);
                                            });
    }else{
      this.mustDoSelect = await 'Seleccionar equipo';
      const objetoSelect = await {
        ordenModificadaIniciado : this.objDetalles.orden,
        atras : this.atras,
        fechaHora: this.fechaHora,
        ubicacion: this.observaciones,
        vehiculo: this.objDetalles.orden.vehiculos[this.objDetalles.obj.ind].codigo,
        service: this.mustDoSelect,
        equipo: this.objDetalles.obj.equipo
      };
      this.modalController.dismiss(objetoSelect);
    }
  }


}
