// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginUrl: 'https://login2.disatel.app/LOGIN/API/API_login.php?request=',
  // loginUrl: 'https://logindisatel.desarrollogt.net/LOGIN/API/API_login.php?request=',
  // loginUrl: 'https://disatel.desarrollogt.net/LOGIN/API/API_login.php?request=',
  ajustesUrl: '/ROOT/API/API_ajustes.php?request=',
  disatelUrl: '/ROOT/API/API_ot_ver.php?request=',
  disatelEjecutar: '/ROOT/API/API_ot_ejecutar.php?request=',
  fotoVehiculo: '/ROOT/API/API_imagen_vehiculo.php?',
  fotoOrden: '/ROOT/API/API_imagen_ot.php?',
  notification: '/ROOT/API/API_pushup_notification.php?request=',
  coordenadas: '/ROOT/CPORDEN/FRMorden.php?'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
