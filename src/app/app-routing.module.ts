import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [
  {
    canActivate: [GuardGuard],
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'security',
    loadChildren: () => import('./pages/security/security.module').then( m => m.SecurityPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'notificaciones',
    loadChildren: () => import('./pages/notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'detail-modal',
    loadChildren: () => import('./pages/detail-modal/detail-modal.module').then( m => m.DetailModalPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'ver-vehiculo',
    loadChildren: () => import('./pages/ver-vehiculo/ver-vehiculo.module').then( m => m.VerVehiculoPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'ver-datos',
    loadChildren: () => import('./pages/ver-datos/ver-datos.module').then( m => m.VerDatosPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'ver-sim',
    loadChildren: () => import('./pages/ver-sim/ver-sim.module').then( m => m.VerSIMPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'modal-observaciones',
    loadChildren: () => import('./pages/modal-observaciones/modal-observaciones.module').then( m => m.ModalObservacionesPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'trabajar-vehiculo',
    loadChildren: () => import('./pages/trabajar-vehiculo/trabajar-vehiculo.module').then( m => m.TrabajarVehiculoPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'ubicacion-equipo',
    loadChildren: () => import('./pages/ubicacion-equipo/ubicacion-equipo.module').then( m => m.UbicacionEquipoPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'nombre-imagen',
    loadChildren: () => import('./pages/nombre-imagen/nombre-imagen.module').then( m => m.NombreImagenPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'titulo',
    loadChildren: () => import('./pages/titulo/titulo.module').then( m => m.TituloPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'checklist',
    loadChildren: () => import('./pages/checklist/checklist.module').then( m => m.ChecklistPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'luces-ckecklist',
    loadChildren: () => import('./pages/luces-ckecklist/luces-ckecklist.module').then( m => m.LucesCkecklistPageModule)
  },
  {
    path: 'interior-ckecklist',
    loadChildren: () => import('./pages/interior-ckecklist/interior-ckecklist.module').then( m => m.InteriorCkecklistPageModule)
  },
  {
    path: 'general-ckecklist',
    loadChildren: () => import('./pages/general-ckecklist/general-ckecklist.module').then( m => m.GeneralCkecklistPageModule)
  },
  {
    path: 'modal-sign',
    loadChildren: () => import('./pages/modal-sign/modal-sign.module').then( m => m.ModalSignPageModule)
  },
  {
    path: 'constancia-visita',
    loadChildren: () => import('./pages/constancia-visita/constancia-visita.module').then( m => m.ConstanciaVisitaPageModule)
  },
  {
    path: 'datos-solicitud',
    loadChildren: () => import('./pages/datos-solicitud/datos-solicitud.module').then( m => m.DatosSolicitudPageModule)
  },
  {
    path: 'observaciones',
    loadChildren: () => import('./pages/observaciones/observaciones.module').then( m => m.ObservacionesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
