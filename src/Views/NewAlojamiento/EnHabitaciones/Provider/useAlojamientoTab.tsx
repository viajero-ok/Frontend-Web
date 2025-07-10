import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  getDatosDeRegistroNuevoAlojamiento,
  guardarAlojamiento as guardarAlojamientoService,
  obtenerDatosRegistradosAlojamiento,
  TBodyGuardarAlojamiento,
  THorariosCheckInCheckOut,
  TObtenerDatosRegistradosAlojamientoResponse,
} from "../../../../App/Alojamientos/NuevoAlojamiento";
import { TAdaptedObtenerDatosRegistradosAlojamientoResponse } from "../../../../App/Alojamientos/NuevoAlojamiento.adapter";

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

  caracteristicas: z.array(z.number()),
  normas: z.array(z.number()),
  metodosDePago: z.array(z.number()),
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

  alojamientoEsCompleto: boolean;
  isAlojamientoDirty: boolean;
  actualizarAlojamiento: () => void;
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
  const [esCompleto, setEsCompleto] = React.useState<boolean>(false);

  const handleObtenerDatosRegistradosAlojamiento = () => {
    obtenerDatosRegistradosAlojamiento(idOferta).then(
      (response: TAdaptedObtenerDatosRegistradosAlojamientoResponse) => {
        const reset = {
          // TODO: Agregar al form reset:
          // texto_observacion_canchas_deportes: z.string().optional(),
          // texto_observacion_normas: z.string().optional(),
          // texto_observacion_politica_garantia: z.string().optional(),

          nombre_alojamiento: response.datos.datos_basicos.nombre,
          descripcion_alojamiento: response.datos.datos_basicos.descripcion,

          caracteristicas:
            response && response.datos && response.datos.caracteristicas
              ? response.datos.caracteristicas.sort((a, b) => a - b)
              : [],

          metodosDePago:
            response && response.datos && response.datos.metodos_de_pago
              ? response.datos.metodos_de_pago.sort((a, b) => a - b)
              : [],
          normas: [],

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
        };
        alojamientoForm.reset(reset);

        console.log("reset: ", alojamientoSchema.safeParse(reset).error);
        setEsCompleto(alojamientoSchema.safeParse(reset).success);
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

  const alojamientoForm = useForm<z.infer<typeof alojamientoSchema>>({
    resolver: zodResolver(alojamientoSchema),
    mode: "onSubmit",
    defaultValues: {
      solicita_garantia: false,
    },
  });
  const formWatch = alojamientoForm.watch();

  React.useEffect(() => {
    setEsCompleto(
      alojamientoSchema.safeParse(alojamientoForm.getValues()).success &&
        !alojamientoForm.formState.isDirty
    );
  }, [alojamientoForm.formState]);

  const context: AlojamientoContextValue = {
    alojamientoSchema,
    alojamientoForm,
    alojamientoEsCompleto: esCompleto,
    /** alojamiento */
    datosRegistradosAlojamiento,
    datosRegistroAlojamiento,
    guardarAlojamiento,
    isAlojamientoDirty: alojamientoForm.formState.isDirty,
    actualizarAlojamiento: handleObtenerDatosRegistradosAlojamiento,
  };
  return context;
};

export { useAlojamientoTab };
