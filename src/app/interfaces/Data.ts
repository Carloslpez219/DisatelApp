export interface Data {
    status: {
        status: boolean;
    };
    data: {
        codigo: string;
        nombre: string;
        mail: string;
        telefono: string;
        rol: string;
        rol_nombre: string;
        url_foto: string;
        sedes_in: string;
        categorias_in: string;
        dominio: string;
    };
    message: string;
}

export interface RootObject {
  status: boolean;
  data: Datum[];
  message: string;
}

export interface Datum {
  codigo_area: string;
  codigo_lista: string;
  codigo_programacion: string;
  categoria: string;
  nombre_lista: string;
  requiere_firma: boolean;
  requiere_foto: boolean;
  programacion: Programacion[];
  preguntas: Pregunta[];
}

export interface Pregunta {
  pregunta_codigo: string;
  pregunta_texto: string;
  respuesta: string;
}

export interface Programacion {
  sede: string;
  sector: string;
  area: string;
  nivel: string;
  hora_ini: string;
  hora_fin: string;
  observaciones: string;
  dias: number[];
}
