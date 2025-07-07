import React from "react";
import {
  deleteHorario,
  getDatosDeRegistroNuevoAlojamiento,
  obtenerDatosRegistradosAlojamiento,
  TBodyGuardarAlojamiento,
  TObtenerDatosRegistradosAlojamientoResponse,
  guardarAlojamiento as guardarAlojamientoService,
  crearHorario,
  THorariosCheckInCheckOut,
} from "../../../../App/Alojamientos/NuevoAlojamiento";
import { TAdaptedObtenerDatosRegistradosAlojamientoResponse } from "../../../../App/Alojamientos/NuevoAlojamiento.adapter";
import { z } from "zod";

const horarioSchema = z.object({
  hora_check_in: z
    .number({ message: "El horario de Check-In es requerido" })
    .min(0, "El horario de Check-In debe ser en el formato HH:MM")
    .max(23, "El horario de Check-In debe ser en el formato HH:MM"),
  minuto_check_in: z
    .number({ message: "El horario de Check-In es requerido" })
    .min(0, "El horario de Check-In debe ser en el formato HH:MM")
    .max(59, "El horario de Check-In debe ser en el formato HH:MM"),
  hora_check_out: z
    .number({ message: "El horario de Check-Out es requerido" })
    .min(0, "El horario de Check-Out debe ser en el formato HH:MM")
    .max(23, "El horario de Check-Out debe ser en el formato HH:MM"),
  minuto_check_out: z
    .number({ message: "El horario de Check-Out es requerido" })
    .min(0, "El horario de Check-Out debe ser en el formato HH:MM")
    .max(59, "El horario de Check-Out debe ser en el formato HH:MM"),
  algun_dia: z.boolean().refine((val) => val === true, {
    message: "Al menos un día debe ser seleccionado",
  }),
});

export type THorariosCheckInCheckOutContext = THorariosCheckInCheckOut & {
  errors: string[];
};

export type AlojamientoContextValue = {
  datosRegistradosAlojamiento:
    | TObtenerDatosRegistradosAlojamientoResponse
    | undefined;
  datosRegistroAlojamiento: any;
  guardarAlojamiento: (body: TBodyGuardarAlojamiento) => Promise<void>;

  /** horarios */
  horarios: THorariosCheckInCheckOutContext[];
  updateHorario: (
    id_horario: string,
    callback: (
      prev: THorariosCheckInCheckOutContext
    ) => THorariosCheckInCheckOutContext
  ) => void;
  registrarHorario: (body: { id_oferta: string }) => Promise<void>;
  eliminarHorario: (id_oferta: string) => Promise<void>;
};

const useAlojamiento = ({ idOferta }: { idOferta: string }) => {
  const [datosRegistradosAlojamiento, setDatosRegistradosAlojamiento] =
    React.useState<TObtenerDatosRegistradosAlojamientoResponse>();
  const [datosRegistroAlojamiento, setDatosRegistroAlojamiento] =
    React.useState<{
      caracteristicas: any[];
      politicasDeCancelacion: any[];
      tiposPagoAnticipado: any[];
      metodosDePago: any[];
    }>({
      caracteristicas: [],
      politicasDeCancelacion: [],
      tiposPagoAnticipado: [],
      metodosDePago: [],
    });
  const [horarios, setHorarios] = React.useState<
    THorariosCheckInCheckOutContext[]
  >([]);

  /** alojamiento */
  const handleObtenerDatosRegistradosAlojamiento = () => {
    obtenerDatosRegistradosAlojamiento(idOferta).then(
      (response: TAdaptedObtenerDatosRegistradosAlojamientoResponse) => {
        setDatosRegistradosAlojamiento(response);
        setHorarios(response.datos.horarios_checkin_checkout);
      }
    );
  };

  const handleObtenerDatosRegistroAlojamiento = () => {
    getDatosDeRegistroNuevoAlojamiento()
      .then((response: any) => {
        setDatosRegistroAlojamiento({
          caracteristicas: response.data.caracteristicas,
          politicasDeCancelacion: response.data.politicas_cancelacion,
          tiposPagoAnticipado: response.data.tipos_pago_anticipado,
          metodosDePago: response.data.metodos_pago,
        });
      })
      .catch((error: any) => {});
  };

  React.useEffect(() => {
    handleObtenerDatosRegistradosAlojamiento();
    handleObtenerDatosRegistroAlojamiento();
  }, []);

  /** alojamiento */
  const guardarAlojamiento = async (body: TBodyGuardarAlojamiento) => {
    try {
      console.log("llama");
      await guardarAlojamientoService(body);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  /** horarios */
  const registrarHorario = async (body: { id_oferta: string }) => {
    try {
      const idHorario = (await crearHorario(body)).data.id_horario;
      const newHorario = {
        id_horario: idHorario,
        check_in: {
          hora_check_in: -1,
          minuto_check_in: -1,
        },
        check_out: { hora_check_out: -1, minuto_check_out: -1 },
        aplica_todos_los_dias: false,
        dias_semana: {
          aplica_lunes: false,
          aplica_martes: false,
          aplica_miercoles: false,
          aplica_jueves: false,
          aplica_viernes: false,
          aplica_sabado: false,
          aplica_domingo: false,
        },
      };
      const parsed = horarioSchema.safeParse(newHorario);
      const errorsWithoutDuplicates = [
        ...new Set(
          parsed.error?.errors.map((zodIssue: z.ZodIssue) => zodIssue.message)
        ),
      ];
      setHorarios((prev: THorariosCheckInCheckOutContext[]) => [
        ...prev,
        {
          ...newHorario,
          errors: errorsWithoutDuplicates,
        },
      ]);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const updateHorario = (
    id_horario: string,
    callback: (
      prev: THorariosCheckInCheckOutContext
    ) => THorariosCheckInCheckOutContext
  ) => {
    setHorarios((prev: THorariosCheckInCheckOutContext[]) => {
      const copyList = [
        ...prev.filter(
          (horario: THorariosCheckInCheckOutContext) =>
            horario.id_horario != id_horario
        ),
      ];
      const copyItem = [
        ...prev.filter(
          (horario: THorariosCheckInCheckOutContext) =>
            horario.id_horario == id_horario
        ),
      ][0];
      if (!copyItem)
        throw new Error("Horario de id_horario: " + id_horario + " no existe");

      const updatedItem = callback(copyItem);

      const parsed = horarioSchema.safeParse({
        hora_check_in: updatedItem.check_in.hora_check_in,
        minuto_check_in: updatedItem.check_in.minuto_check_in,
        hora_check_out: updatedItem.check_out.hora_check_out,
        minuto_check_out: updatedItem.check_out.minuto_check_out,
        algun_dia:
          Object.values(updatedItem.dias_semana).filter((dia: boolean) => dia)
            .length > 0,
      });
      const errorsWithoutDuplicates = [
        ...new Set(
          parsed.error?.errors.map((zodIssue: z.ZodIssue) => zodIssue.message)
        ),
      ];

      return [
        ...copyList,
        { ...updatedItem, errors: errorsWithoutDuplicates },
      ].sort(
        (
          a: THorariosCheckInCheckOutContext,
          b: THorariosCheckInCheckOutContext
        ) => Number(a.id_horario) - Number(b.id_horario)
      );
    });
  };

  const eliminarHorario = async (id_horario: string) => {
    try {
      await deleteHorario(id_horario);
      setHorarios((prev: THorariosCheckInCheckOutContext[]) =>
        [...prev].filter(
          (horario: THorariosCheckInCheckOutContext) =>
            horario.id_horario != id_horario
        )
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const context: AlojamientoContextValue = {
    /** alojamiento */
    datosRegistradosAlojamiento,
    datosRegistroAlojamiento,
    guardarAlojamiento,

    /** horarios */
    horarios,
    updateHorario,
    registrarHorario,
    eliminarHorario,
  };
  return context;
};

export { useAlojamiento };
