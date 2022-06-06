import { Component, Input, OnInit } from '@angular/core';
import { DisatelService } from '../../services/disatel.service';
import { Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.page.html',
  styleUrls: ['./titulo.page.scss'],
})
export class TituloPage implements OnInit {

  @Input() tit;

  titulos = [];

  constructor(private disatelservice: DisatelService, private modalController: ModalController, private platform: Platform) { }

  async ngOnInit() {
    if (this.tit === 'general'){
      await (await this.disatelservice.getLista())
        .subscribe(async (resp: any) => {
          console.log(resp.data);
          this.titulos = await resp.data;
      });
    }else{
      await (await this.disatelservice.getListaVehiculos())
        .subscribe(async (resp: any) => {
          console.log(resp.data);
          this.titulos = await resp.data;
      });
    }
  }

  seleccionarTitulo(event){
    this.modalController.dismiss(event.detail.value);
  }

  back(){
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.modalController.dismiss();
    });
    this.modalController.dismiss();
  }


}
