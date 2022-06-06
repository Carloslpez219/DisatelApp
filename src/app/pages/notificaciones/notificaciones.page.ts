import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DisatelService } from '../../services/disatel.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  constructor(private navCtrl: NavController, private disatelService: DisatelService) { }

  notificaciones = [];
  mostrarData;

  async ngOnInit() {
    (await this.disatelService.listNotifications(1))
      .subscribe((resp: any) => this.notificaciones = resp.data);
    if (this.notificaciones.length === 0){
      this.mostrarData = false;
    }else{
      this.mostrarData = true;
    }
  }

  back() {
    this.navCtrl.back({
      animated: true
    });
  }

}
