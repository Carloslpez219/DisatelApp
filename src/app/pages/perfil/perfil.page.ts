import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Data } from 'src/app/interfaces/Data';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfilData: any;
  urlFoto: any;
  mostrarData = false;
  profileForm: FormGroup;
  items = Array(3);
  myImage = null;
  pattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private userService: UserService, private storage: Storage, private alertService: AlertService,
              private navCtrl: NavController) {
    this.profileForm = this.createFormGroup();
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const isOnLine = navigator.onLine;
    if (isOnLine){
      this.getData();
      this.getFoto();
    }else {
      this.perfilData = await this.storage.get('datos');
      this.urlFoto = this.perfilData.url_foto;
      this.defaultValue( this.perfilData );
      this.mostrarData = true;
    }
  }

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
      telefono: new FormControl('', [Validators.required])
    });
  }

  defaultValue( perfilData ){
    this.profileForm.controls.nombre.setValue(perfilData.nombre);
    this.profileForm.controls.mail.setValue(perfilData.mail);
    this.profileForm.controls.telefono.setValue(perfilData.telefono);
  }

  get nombre() { return this.profileForm.get('nombre'); }
  get mail() { return this.profileForm.get('mail'); }
  get telefono() { return this.profileForm.get('telefono'); }

  async getData() {
    const datosUsuario = await this.storage.get('datos');
    if ( datosUsuario ) {
      (await this.userService.getPerfil(datosUsuario.codigo)).subscribe((resp: Data) => {
        this.perfilData = resp.data;
        this.defaultValue( this.perfilData );
        this.mostrarData = true;
      });
    }
  }

  async getFoto() {
    const datosUsuario = await this.storage.get('datos');
    if ( datosUsuario ) {
      (await this.userService.getFoto(datosUsuario.codigo)).subscribe((resp: Data) => {
        this.urlFoto = resp.data.url_foto;
        this.mostrarData = true;
      });
    }
  }

  clean(){
    this.profileForm.reset();
  }

  async editProfile(){
    const datosUsuario = await this.storage.get('datos');
    if ( datosUsuario ) {
    await (await this.userService.editProfile(datosUsuario.codigo, this.profileForm.value.nombre, this.profileForm.value.mail,
            this.profileForm.value.telefono)).
      subscribe((resp: Data) => {
        if (resp.status){
          this.mostrarData = false;
          this.alertService.presentToast('Registro actualizado!', 'dark', 2500);
          this.getData();
        }else{
          this.alertService.presentToast('Ha ocurrido un error, intenta más tarde', 'success', 2500);
        }
      });
    }
  }

  back(){
    this.navCtrl.back({animated: true});
  }

}
