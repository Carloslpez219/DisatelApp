import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  NavController
} from '@ionic/angular';
import {
  Storage
} from '@ionic/storage';
import {
  Data
} from 'src/app/interfaces/Data';
import {
  AlertService
} from 'src/app/services/alert.service';
import {
  UserService
} from 'src/app/services/user.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
})
export class SecurityPage implements OnInit {

  perfilData: any;
  mostrarData = false;
  changeForm: FormGroup;
  valueBar = 0;
  color = 'danger';

  constructor(private navCtrl: NavController, private userService: UserService, private storage: Storage,
              private alertService: AlertService) {
    this.changeForm = this.createFormGroup();
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    const isOnLine = navigator.onLine;
    if (isOnLine){
      this.getData();
    }else{
      this.perfilData = await this.storage.get('datos');
      this.defaultValue(this.perfilData);
      this.mostrarData = true;
    }
  }

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl({
        value: '',
        disabled: true
      }, [Validators.required]),
      usuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  defaultValue(perfilData) {
    this.changeForm.controls.nombre.setValue(perfilData.nombre);
    this.changeForm.controls.usuario.setValue(perfilData.usu);
  }

  get nombre() {
    return this.changeForm.get('nombre');
  }
  get usuario() {
    return this.changeForm.get('usuario');
  }
  get password() {
    return this.changeForm.get('password');
  }
  get confirmPassword() {
    return this.changeForm.get('confirmPassword');
  }

  async getData() {
    const datosUsuario = await this.storage.get('datos');
    if (datosUsuario) {
      (await this.userService.getPassword(datosUsuario.codigo)).subscribe((resp: Data) => {
        this.perfilData = resp.data;
        this.defaultValue(this.perfilData);
        this.mostrarData = true;
      });
    }
  }

  back() {
    this.navCtrl.back({
      animated: true
    });
  }

  clean() {
    this.changeForm.controls.usuario.setValue('');
    this.changeForm.controls.password.setValue('');
    this.changeForm.controls.confirmPassword.setValue('');
  }


  async resetPassword() {
    const datosUsuario = await this.storage.get('datos');
    if (datosUsuario) {
      await (await this.userService.setPassword(datosUsuario.codigo, this.changeForm.value.usuario, this.changeForm.value.password)).
      subscribe((resp: Data) => {
        if (resp.status) {
          this.alertService.presentAlert('Contraseña y usuario actualizado!');
          this.mostrarData = false;
          this.changeForm.reset();
          this.valueBar = 0;
          this.getData();
        } else {
          this.alertService.presentAlert('Ha ocurrido un error, intenta más tarde');
        }
      });
    }
  }

  seguridad_clave(clave) {
    let seguridad = 0;
    if (clave.length !== 0) {
      if (this.tiene_numeros(clave) && this.tiene_letras(clave)) {
        seguridad += 30;
      }
      if (this.tiene_minusculas(clave) && this.tiene_mayusculas(clave)) {
        seguridad += 30;
      }
      if (clave.length >= 4 && clave.length <= 5) {
        seguridad += 10;
      } else {
        if (clave.length >= 6 && clave.length <= 8) {
          seguridad += 30;
        } else {
          if (clave.length > 8) {
            seguridad += 40;
          }
        }
      }
    }
    seguridad *= 0.01;
    if (0.35 >= seguridad) {
      this.color = 'danger';
    } else if (seguridad >= 0.36 && 0.80 >= seguridad) {
      this.color = 'warning';
    } else {
      this.color = 'success';
    }
    this.valueBar = seguridad;
  }

  tiene_numeros(texto) {
    const numeros = '0123456789';
    let i;
    for (i = 0; i < texto.length; i++) {
      if (numeros.indexOf(texto.charAt(i), 0) !== -1) {
        return 1;
      }
    }
    return 0;
  }

  tiene_letras(texto) {
    const letras = 'abcdefghyjklmnñopqrstuvwxyz';
    let i;
    texto = texto.toLowerCase();
    for (i = 0; i < texto.length; i++) {
      if (letras.indexOf(texto.charAt(i), 0) !== -1) {
        return 1;
      }
    }
    return 0;
  }

  tiene_minusculas(texto) {
    const letras = 'abcdefghyjklmnñopqrstuvwxyz';
    let i;
    for (i = 0; i < texto.length; i++) {
      if (letras.indexOf(texto.charAt(i), 0) !== -1) {
        return 1;
      }
    }
    return 0;
  }

  tiene_mayusculas(texto) {
    const letrasMayusculas = 'ABCDEFGHYJKLMNÑOPQRSTUVWXYZ';
    let i;
    for (i = 0; i < texto.length; i++) {
      if (letrasMayusculas.indexOf(texto.charAt(i), 0) !== -1) {
        return 1;
      }
    }
    return 0;
  }

}
