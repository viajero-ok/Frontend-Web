import { THorariosCheckInCheckOutContext } from "../../Views/NewAlojamiento/EnHabitaciones/Provider/AlojamientoEnHabitacionesProvider";
import {
  THorariosCheckInCheckOut,
  TObtenerDatosRegistradosAlojamientoResponse,
} from "./NuevoAlojamiento";

export type TAdaptedObtenerDatosRegistradosAlojamientoResponse = Omit<
  TObtenerDatosRegistradosAlojamientoResponse,
  "datos"
> & {
  datos: Omit<
    TObtenerDatosRegistradosAlojamientoResponse["datos"],
    "horarios_checkin_checkout"
  > & {
    horarios_checkin_checkout: THorariosCheckInCheckOutContext[];
  };
};
export const adaptObtenerDatosRegistradosAlojamiento = (
  response: TObtenerDatosRegistradosAlojamientoResponse
): TAdaptedObtenerDatosRegistradosAlojamientoResponse => ({
  ...response,
  datos: {
    ...response.datos,
    caracteristicas: response.datos.caracteristicas?.map(
      (caracteristica: any) => caracteristica.id_caracteristica
    ),
    metodos_de_pago: response.datos.metodos_de_pago?.map(
      (metodo: any) => metodo.id_metodo_pago
    ),
    horarios_checkin_checkout: response.datos.horarios_checkin_checkout.map(
      (
        horario: TObtenerDatosRegistradosAlojamientoResponse["datos"]["horarios_checkin_checkout"]
      ) => ({
        id_horario: horario.id_horario,
        check_in: {
          hora_check_in: horario.check_in_hora,
          minuto_check_in: horario.check_in_minuto,
        },
        check_out: {
          hora_check_out: horario.check_out_hora,
          minuto_check_out: horario.check_out_minuto,
        },
        aplica_todos_los_dias: false,
        dias_semana: {
          aplica_lunes: horario.aplica_lunes == 1,
          aplica_martes: horario.aplica_martes == 1,
          aplica_miercoles: horario.aplica_miercoles == 1,
          aplica_jueves: horario.aplica_jueves == 1,
          aplica_viernes: horario.aplica_viernes == 1,
          aplica_sabado: horario.aplica_sabado == 1,
          aplica_domingo: horario.aplica_domingo == 1,
        },
        hasError: false,
      })
    ),
  },
});
