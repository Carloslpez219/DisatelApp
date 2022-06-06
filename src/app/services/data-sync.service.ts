import { Injectable } from '@angular/core';
import { DisatelService } from './disatel.service';
import {
  Storage
} from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class DataSyncService {

  execute = [];
  equipo = [];
  sim = [];
  file = [];
  fileVehiculo = [];
  titulos = [];
  titulosVehiculos = [];

  constructor( private storage: Storage, private disatelService: DisatelService ) {
    this.cargarStorage();
  }

  async cargarStorage() {
    this.execute = await this.storage.get('execute') || [];
    this.equipo = await this.storage.get('equipo') || [];
    this.sim = await this.storage.get('sim') || [];
    this.file = await this.storage.get('file') || [];
    this.fileVehiculo = await this.storage.get('fileVehiculo') || [];
    this.titulos = await this.storage.get('titulos') || [];
    this.titulosVehiculos = await this.storage.get('titulosVehiculos') || [];
  }

  async saveTitulos(){
    await this.cargarStorage();
    await (await this.disatelService.getLista())
        .subscribe(async (resp: any) => {
          await this.titulos.push(resp.data);
          await this.storage.set('titulos', this.titulos);
      });
  }

  async saveTitulosVehiculos(){
    await this.cargarStorage();
    await (await this.disatelService.getListaVehiculos())
        .subscribe(async (resp: any) => {
          await this.titulosVehiculos.push(resp.data);
          await this.storage.set('titulosVehiculos', this.titulosVehiculos);
      });
  }

  async saveService( service, fechaHora, observaciones, ot, codVehiculo ) {
    await this.cargarStorage();
    const objExecute = await {
      servicio: service,
      fechaYHora: fechaHora,
      Observaciones: observaciones,
      vehiculo: codVehiculo,
      orden: ot
    };
    this.execute.push( objExecute );
    this.storage.set('execute', this.execute);
  }

  async saveServiceEquipo( service, fechaHora, ubicacion, ot, codVehiculo, equipo ) {
    await this.cargarStorage();
    const objEquipo = await {
      servicio: service,
      fechaYHora: fechaHora,
      Ubicacion: ubicacion,
      vehiculo: codVehiculo,
      orden: ot,
      Equipo: equipo
    };
    this.equipo.push( objEquipo );
    this.storage.set('equipo', this.equipo);
  }

  async saveServiceFile( service, ot, file, titulo ) {
    await this.cargarStorage();
    const objFile = await {
      servicio: service,
      orden: ot,
      File: file,
      Titulo: titulo
    };
    this.file.push( objFile );
    this.storage.set('sim', this.file);
  }

  async saveServiceFileVehiculo( service, ot, vehiculo, file, titulo ) {
    await this.cargarStorage();
    const objFileVehiculo = await {
      servicio: service,
      orden: ot,
      Vehiculo: vehiculo,
      File: file,
      Titulo: titulo
    };
    this.fileVehiculo.push( objFileVehiculo );
    this.storage.set('fileVehiculo', this.fileVehiculo);
  }

  async saveServiceSim( service, fechaHora, sim, ot, codVehiculo, equipo ) {
    await this.cargarStorage();
    const objSim = await {
      servicio: service,
      fechaYHora: fechaHora,
      Sim: sim,
      vehiculo: codVehiculo,
      orden: ot,
      Equipo: equipo
    };
    this.sim.push( objSim );
    this.storage.set('sim', this.sim);
  }

}
