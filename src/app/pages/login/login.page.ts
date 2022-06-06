import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NavController, LoadingController} from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };
  loginForm: FormGroup;

  constructor(private navCtrl: NavController, private userService: UserService, public loadingController: LoadingController,
              private alertService: AlertService,  private storage: Storage) {
                this.loginForm = this.createFormGroup();
              }

  ngOnInit() {}

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get nombre() { return this.loginForm.get('nombre'); }
  get password() { return this.loginForm.get('password'); }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  async login(){
      this.presentLoading();
      const valid = await this.userService.login(this.loginForm.value.nombre, this.loginForm.value.password);
      if (valid){
        await this.loadingController.dismiss();
        await this.storage.set('notification', true);
        this.navCtrl.navigateRoot('/');
      }else{
        this.loadingController.dismiss();
        const message = 'Usuario y/o Contraseña son incorrectos';
        this.alertService.presentToast(message, 'dark', 3000);
        this.loginForm.reset();
      }
  }

}

