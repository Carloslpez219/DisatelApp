import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { Data } from '../interfaces/Data';


const loginUrl = environment.loginUrl;
const ajustesUrl  = environment.ajustesUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  data: object = null;
  datosUsuario;

  constructor( private http: HttpClient, private storage: Storage ) { this.storage.create();}

  login<T>( usu, password){
    return new Promise (resolve => {
      this.http.get<Data>(`${loginUrl}login&usu=${usu}&pass=${password}`).subscribe(async resp => {
        console.log(`${loginUrl}login&usu=${usu}&pass=${password}`);
        console.log(resp);
        if ( resp.status ){
          await this.datosLocalStorage( resp.data );
          resolve(true);
        }else{
          this.data = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  async datosLocalStorage( data: object){
    this.storage.create();
    this.data = data;
    await this.storage.set('datos', data);
  }

  async getPerfil<T>(usuario){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${ajustesUrl}get_perfil&usuario=${usuario}`);
  }

  async getFoto<T>(usuario){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${ajustesUrl}get_foto&usuario=${usuario}`);
  }

  async editProfile<T>(usuario, nombre, mail, telefono){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${ajustesUrl}set_perfil&usuario=${usuario}&nombre=${nombre}&mail=${mail}&telefono=${telefono}`);
  }

  async getPassword<T>(usuario){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${ajustesUrl}get_pasword&usuario=${usuario}`);
  }

  async setPassword<T>(usuario, usu, password){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}${ajustesUrl}set_pasword&usuario=${usuario}&usu=${usu}&pass=${password}`);
  }

}
