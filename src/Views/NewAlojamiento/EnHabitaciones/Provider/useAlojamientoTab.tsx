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
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const numeric = z
  .preprocess((val) => {
    if (typeof val === "string" && /^[0-9]+$/.test(val)) {
      return Number(val);
    }
    return val;
  }, z.number({ message: "Debe ser un número" }))
  .optional();

const alojamientoSchema = z.object({
  texto_observacion_canchas_deportes: z.string().optional(),
  texto_observacion_normas: z.string().optional(),
  texto_observacion_politica_garantia: z.string().optional(),

  nombre_alojamiento: z.string({ message: "El campo es requerido." }),
  descripcion_alojamiento: z.string({ message: "El campo es requerido." }),

  id_politica_cancelacion: z.number({ message: "El campo es requerido." }),
  plazo_dias_cancelacion: numeric,
  solicita_garantia: z.boolean(),
  monto_garantia: z.string().optional(),
  id_tipo_pago_anticipado: z.number({ message: "El campo es requerido." }),
  porcentaje_pago_anticipado: z.any(),
  minimo_dias_estadia: numeric,

  caracteristicas: z.array(z.number()).default([]),
  normas: z.array(z.number()).default([]),
  metodosDePago: z.array(z.number()).default([]),

  //horarios: z.array(z.any()),
});

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
  alojamientoSchema: typeof alojamientoSchema;
  alojamientoForm: UseFormReturn<z.infer<typeof alojamientoSchema>>;
  formCaracteristicas: number[];
  setFormCaracteristicas: React.Dispatch<React.SetStateAction<number[]>>;
  formMetodosDePago: number[];
  setFormMetodosDePago: React.Dispatch<React.SetStateAction<number[]>>;

  /** horarios */
  // horarios: THorariosCheckInCheckOutContext[];
  // updateHorario: (
  //   id_horario: string,
  //   callback: (
  //     prev: THorariosCheckInCheckOutContext
  //   ) => THorariosCheckInCheckOutContext
  // ) => void;
  // registrarHorario: (body: { id_oferta: string }) => Promise<void>;
  // eliminarHorario: (id_oferta: string) => Promise<void>;

  alojamientoEsCompleto: boolean;
  isAlojamientoDirty: boolean;
};

const useAlojamientoTab = ({ idOferta }: { idOferta: string }) => {
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
  // const [horarios, setHorarios] = React.useState<
  //   THorariosCheckInCheckOutContext[]
  // >([]);
  const [esCompleto, setEsCompleto] = React.useState<boolean>(false);
  const [formCaracteristicas, setFormCaracteristicas] = React.useState<
    number[]
  >([]);
  const [formMetodosDePago, setFormMetodosDePago] = React.useState<number[]>(
    []
  );

  const handleObtenerDatosRegistradosAlojamiento = () => {
    obtenerDatosRegistradosAlojamiento(idOferta).then(
      (response: TAdaptedObtenerDatosRegistradosAlojamientoResponse) => {
        //setHorarios(response.datos.horarios_checkin_checkout);

        alojamientoForm.reset(
          {
            // TODO: Agregar al form reset:
            // texto_observacion_canchas_deportes: z.string().optional(),
            // texto_observacion_normas: z.string().optional(),
            // texto_observacion_politica_garantia: z.string().optional(),

            nombre_alojamiento: response.datos.datos_basicos.nombre,
            descripcion_alojamiento: response.datos.datos_basicos.descripcion,

            caracteristicas:
              response && response.datos && response.datos.caracteristicas
                ? response.datos.caracteristicas
                : [],

            metodosDePago:
              response && response.datos && response.datos.metodos_de_pago
                ? response.datos.metodos_de_pago
                : [],

            id_politica_cancelacion:
              response.datos.datos_basicos.id_politica_cancelacion,
            plazo_dias_cancelacion:
              response.datos.datos_basicos.plazo_dias_cancelacion,
            solicita_garantia:
              response.datos.datos_basicos.bl_solicita_garantia == 1,
            monto_garantia: response.datos.datos_basicos.monto_garantia,
            id_tipo_pago_anticipado:
              response.datos.datos_basicos.id_tipo_pago_anticipado,
            porcentaje_pago_anticipado:
              response.datos.datos_basicos.porcentaje_pago_anticipado,
            minimo_dias_estadia: response.datos.datos_basicos.min_dias_estadia,

           // horarios: response.datos.horarios_checkin_checkout,
          },
          { keepDefaultValues: false }
        );
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
      // setHorarios((prev: THorariosCheckInCheckOutContext[]) => [
      //   ...prev,
      //   {
      //     ...newHorario,
      //     errors: errorsWithoutDuplicates,
      //   },
      // ]);
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
    // setHorarios((prev: THorariosCheckInCheckOutContext[]) => {
    //   const copyList = [
    //     ...prev.filter(
    //       (horario: THorariosCheckInCheckOutContext) =>
    //         horario.id_horario != id_horario
    //     ),
    //   ];
    //   const copyItem = [
    //     ...prev.filter(
    //       (horario: THorariosCheckInCheckOutContext) =>
    //         horario.id_horario == id_horario
    //     ),
    //   ][0];
    //   if (!copyItem)
    //     throw new Error("Horario de id_horario: " + id_horario + " no existe");

    //   const updatedItem = callback(copyItem);

    //   const parsed = horarioSchema.safeParse({
    //     hora_check_in: updatedItem.check_in.hora_check_in,
    //     minuto_check_in: updatedItem.check_in.minuto_check_in,
    //     hora_check_out: updatedItem.check_out.hora_check_out,
    //     minuto_check_out: updatedItem.check_out.minuto_check_out,
    //     algun_dia:
    //       Object.values(updatedItem.dias_semana).filter((dia: boolean) => dia)
    //         .length > 0,
    //   });
    //   const errorsWithoutDuplicates = [
    //     ...new Set(
    //       parsed.error?.errors.map((zodIssue: z.ZodIssue) => zodIssue.message)
    //     ),
    //   ];

    //   return [
    //     ...copyList,
    //     { ...updatedItem, errors: errorsWithoutDuplicates },
    //   ].sort(
    //     (
    //       a: THorariosCheckInCheckOutContext,
    //       b: THorariosCheckInCheckOutContext
    //     ) => Number(a.id_horario) - Number(b.id_horario)
    //   );
    // });
  };

  const eliminarHorario = async (id_horario: string) => {
    try {
      await deleteHorario(id_horario);
      // setHorarios((prev: THorariosCheckInCheckOutContext[]) =>
      //   [...prev].filter(
      //     (horario: THorariosCheckInCheckOutContext) =>
      //       horario.id_horario != id_horario
      //   )
      // );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const alojamientoForm = useForm<z.infer<typeof alojamientoSchema>>({
    resolver: zodResolver(alojamientoSchema),
    mode: "onSubmit",
    defaultValues: {
      solicita_garantia: false,
    },
  });
  const formWatch = alojamientoForm.watch();

  // React.useEffect(() => {
  //   setEsCompleto(
  //     !alojamientoForm.formState.isDirty &&
  //       alojamientoSchema.safeParse(alojamientoForm.getValues()).success
  //   );
  // }, [horarios, alojamientoForm.formState]);

  const context: AlojamientoContextValue = {
    alojamientoSchema,
    alojamientoForm,
    alojamientoEsCompleto: esCompleto,
    /** alojamiento */
    datosRegistradosAlojamiento,
    formCaracteristicas,
    setFormCaracteristicas,
    formMetodosDePago,
    setFormMetodosDePago,
    datosRegistroAlojamiento,
    guardarAlojamiento,
    isAlojamientoDirty: alojamientoForm.formState.isDirty,

    // /** horarios */
    // horarios,
    // updateHorario,
    // registrarHorario,
    // eliminarHorario,
  };
  return context;
};

export { useAlojamientoTab };
