import AUTH_API from "../AuthBackendApi";

type TBodyRegistrarNuevoAlojamiento = {
  id_tipo_oferta: number;
  id_sub_tipo_oferta: number;
};
export const registrarNuevoAlojamiento = async (
  body: TBodyRegistrarNuevoAlojamiento
) => await AUTH_API.post(`/ofertas-turisticas/registrar-oferta-turistica`, body);

export const getDatosDeRegistroNuevoAlojamiento = async () =>
  await AUTH_API.get(`/alojamientos/datos-registro-alojamiento`);

export type THorariosCheckInCheckOut = {
  id_horario: number;
  check_in: {
    hora_check_in: number;
    minuto_check_in: number;
  };
  check_out: {
    hora_check_out: number;
    minuto_check_out: number;
  };
  aplica_todos_los_dias: boolean;
  dias_semana: {
    aplica_lunes: boolean;
    aplica_martes: boolean;
    aplica_miercoles: boolean;
    aplica_jueves: boolean;
    aplica_viernes: boolean;
    aplica_sabado: boolean;
    aplica_domingo: boolean;
  };
};

export type TBodyGuardarAlojamiento = {
  id_oferta: string;
  caracteristicas: number[];
  metodos_de_pago: number[];
  observaciones: {
    texto_observacion_comodidades_y_servicios_oferta: string;
    texto_observacion_canchas_deportes: string;
    texto_observacion_normas: string;
    texto_observacion_politica_garantia: string;
  };
  politicas_reserva_y_datos_basicos: {
    datos_basicos: {
      id_tipo_oferta: number;
      id_sub_tipo_oferta: number;
      id_establecimiento: number;
      nombre_alojamiento: string;
      descripcion_alojamiento: string;
    };
    politicas_reserva: {
      id_politica_cancelacion: number;
      plazo_dias_cancelacion: number;
      solicita_garantia: boolean;
      monto_garantia: number; // float
      id_tipo_pago_anticipado: number;
      porcentaje_pago_anticipado: number; // float
      monto_pago_anticipado: number; // float
      minimo_dias_estadia: number;
    };
  };
  check_in_out: THorariosCheckInCheckOut[];
};
export const guardarAlojamiento = async (body: TBodyGuardarAlojamiento) =>
  await AUTH_API.patch(`/alojamientos/actualizar-alojamiento`, body);

type TBodyGuardarImagenDeAlojamiento = {
  imagen: File;
  id_oferta: string;
};
// export const guardarImagenDeAlojamiento = async (
//   body: TBodyGuardarImagenDeAlojamiento
// ) => {
//   console.log("body guardar: ", body.imagen);
//   return await AUTH_API.post(
//     `/ofertas-turisticas/registrar-imagen-oferta-turistica`,
//     body
//   );
// };
export const guardarImagenDeAlojamiento = async (
  body: TBodyGuardarImagenDeAlojamiento
) =>
  AUTH_API.post(
    `/ofertas-turisticas/registrar-imagen-oferta-turistica`,
    {
      id_oferta: body.id_oferta,
      imagen: body.imagen,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
