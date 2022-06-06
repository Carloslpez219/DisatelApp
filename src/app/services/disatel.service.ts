import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { Data } from '../interfaces/Data';

const disatelUrl = environment.disatelUrl;
const disatelEjecutar = environment.disatelEjecutar;
const fotoVehiculo = environment.fotoVehiculo;
const fotoOrden = environment.fotoOrden;
const notification = environment.notification;
const coordenadas = environment.coordenadas;

@Injectable({
  providedIn: 'root'
})
export class DisatelService {

  data: object = null;
  datosUsuario;

  constructor(private http: HttpClient, private storage: Storage) {}

  async getOrdenesTrabajo<T>( usuario ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(this.datosUsuario);
    console.log(`https://${this.datosUsuario.dominio}/${disatelUrl}ordenes_asignadas&usuario=${usuario}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelUrl}ordenes_asignadas&usuario=${usuario}`);
  }

  // nuevas rutas

  async getOrdenTrabajo<T>( ot ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}/${disatelUrl}orden&ot=${ot}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelUrl}orden&ot=${ot}`);
  }

  async geServicios<T>( ot ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelUrl}servicios&ot=${ot}`);
  }

  async geTecnicos<T>( ot ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelUrl}tecnicos&ot=${ot}`);
  }

  //

  async ejecutarOT<T>( ot, observaciones, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}salir&ot=${ot}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
  }

  async presenteCliente<T>( ot, observaciones, fechaHora, longitud, latitud ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}/${disatelEjecutar}presente&ot=${ot}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}&longitud=${longitud}&latitud=${latitud}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}presente&ot=${ot}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}&longitud=${longitud}&latitud=${latitud}`);
  }

  async finalizarOrden<T>( ot, observaciones, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}finalizar&ot=${ot}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
  }

  async ordenFallida<T>( ot, observaciones, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}/${disatelEjecutar}fallida&ot=${ot}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}fallida&ot=${ot}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
  }

  async ordenCancelada<T>( ot, observaciones, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}cancelar&ot=${ot}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
  }

  async iniciarVehículo<T>( ot, vehiculo, observaciones, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}inicarVehiculo&ot=${ot}&vehiculo=${vehiculo}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
  }

  async finalizarVehículo<T>( ot, vehiculo, observaciones, fechaHora, recibe){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}finalizarVehiculo&ot=${ot}&vehiculo=${vehiculo}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}&recibe=${recibe}`);
  }

  async solicitarPruebas<T>( ot, vehiculo, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}solicitarPruebas&ot=${ot}&vehiculo=${vehiculo}&usuario=${this.datosUsuario.codigo}&fecha_hora=${fechaHora}`);
  }

  async solicitarAseguramiento<T>( ot, observaciones, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}solicitar_aseguramiento&ot=${ot}&usuario=${this.datosUsuario.codigo}&fecha_hora=${fechaHora}&observaciones=${observaciones}`);
  }

  async fallidoVehículo<T>( ot, vehiculo, observaciones,  fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}/${disatelEjecutar}fallidoVehiculo&ot=${ot}&vehiculo=${vehiculo}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}fallidoVehiculo&ot=${ot}&vehiculo=${vehiculo}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
  }

  async cancelarVehículo<T>( ot, vehiculo, observaciones, fechaHora ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}cancelarVehiculo&ot=${ot}&vehiculo=${vehiculo}&usuario=${this.datosUsuario.codigo}&observaciones=${observaciones}&fecha_hora=${fechaHora}`);
  }

  async seleccionarSim<T>( ot, vehiculo, sim, fechaHora, equipo ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}selecciona_sim&ot=${ot}&sim=${sim}&equipo=${equipo}&vehiculo=${vehiculo}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
  }

  async seleccionarEquipo<T>( ot, vehiculo, equipo, fechaHora, ubicacion ){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}/${disatelEjecutar}selecciona_equipo&ot=${ot}&equipo=${equipo}&ubicacion=${ubicacion}&vehiculo=${vehiculo}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}selecciona_equipo&ot=${ot}&equipo=${equipo}&ubicacion=${ubicacion}&vehiculo=${vehiculo}&fecha_hora=${fechaHora}&usuario=${this.datosUsuario.codigo}`);
  }

  async postFotoVehiculo<T>( ot, vehiculo, file, titulo ){
    const fd = new FormData();
    fd.append('image', file, file.name);
    this.datosUsuario = await this.storage.get('datos');
    return this.http.post(`https://${this.datosUsuario.dominio}/${fotoVehiculo}&ot=${ot}&vehiculo=${vehiculo}&titulo=${titulo}&usuario=${this.datosUsuario.codigo}`, fd);
  }

  async postFotoChecklist<T>( ot, vehiculo, file, codigo ){
    const fd = new FormData();
    fd.append('image', file);
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}/${fotoVehiculo}&ot=${ot}&vehiculo=${vehiculo}&titulo=${codigo}&usuario=${this.datosUsuario.codigo}`);
    return this.http.post(`https://${this.datosUsuario.dominio}/${fotoVehiculo}&ot=${ot}&vehiculo=${vehiculo}&titulo=${codigo}&usuario=${this.datosUsuario.codigo}`, fd);
  }

  async postFotoOrden<T>( ot, file, titulo ){
    const fd = new FormData();
    fd.append('image', file, file.name);
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}/${fotoOrden}ot=${ot}&titulo=${titulo}&usuario=${this.datosUsuario.codigo}`, fd);
    return this.http.post(`https://${this.datosUsuario.dominio}/${fotoOrden}ot=${ot}&titulo=${titulo}&usuario=${this.datosUsuario.codigo}`, fd);
  }

  async eliminarFotoOt<T>( ot, vehiculo, codigos ){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}deleteimagen&ot=${ot}&vehiculo=${vehiculo}&codigos=${codigos}`);
  }

  async eliminarFotoVehiculo<T>(ot, codigos){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}deleteimagenVehiculo&ot=${ot}&codigos=${codigos}`);
  }

  async getLista<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelUrl}titulos_imagenes_vehiculos`);
  }

  async getListaVehiculos<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelUrl}titulos_imagenes_vehiculos`);
  }

  async getInterirores<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelUrl}checklist`);
  }

  async getTitulosImagenes<T>(){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelUrl}titulos_imagenes_checklist`);
  }

  async setChecklist<T>(data, ot, vehiculo, entrega, fechahora){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}finaliza_checklist&data=${data}&ot=${ot}&vehiculo=${vehiculo}&entrega=${entrega}&usuario=${this.datosUsuario.codigo}&fecha_hora=fechahora`);
  }

  async cuestionarioVisita<T>(respuestas, ot){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}finaliza_cuestinario_visita&resultado=${respuestas}&ot=${ot}`);
  }

  async finalizaVisita<T>(ot, reportado, encontrado, solucion, observacion, recibe, internas, fechahora){
    this.datosUsuario = await this.storage.get('datos');
    console.log(`https://${this.datosUsuario.dominio}/${disatelEjecutar}finaliza_visita&ot=${ot}&recibe=${recibe}&reportado=${reportado}&encontrado=${encontrado}&solucion=${solucion}&observacion=${observacion}&internas=${internas}&usuario=${this.datosUsuario.codigo}&fecha_hora=${fechahora}`);
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}finaliza_visita&ot=${ot}&recibe=${recibe}&reportado=${reportado}&encontrado=${encontrado}&solucion=${solucion}&observacion=${observacion}&internas=${internas}&usuario=${this.datosUsuario.codigo}&fecha_hora=${fechahora}`);
  }

  async registrarVisualizacion<T>(ot){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${disatelEjecutar}registrar_visualizacion&ot=${ot}&usuario=${this.datosUsuario.codigo}`);
  }

  // NOTIFICAIONES

  async registrarDispositivo<T>( deviceId, token){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${notification}register&user_id=${this.datosUsuario.codigo}&device_id=${deviceId}&device_token=${token}&device_type=android&certificate_type=1`);
  }

  async quitarDispositivo<T>( deviceId, token){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${notification}unregister&user_id=${this.datosUsuario.codigo}&device_id=${deviceId}&device_token=${token}&device_type=android&certificate_type=1`);
  }

  async listNotifications<T>(page){
    this.datosUsuario = await this.storage.get('datos');
    return this.http.get<T>(`https://${this.datosUsuario.dominio}/${notification}list&user_id=${this.datosUsuario.codigo}type=&page=
                            ${page}`);
  }

}
