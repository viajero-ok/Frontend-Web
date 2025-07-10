import React from "react";
import {
  crearHabitacion,
  eliminarHabitacion,
  guardarHabitacion,
  obtenerDatosRegistradosHabitacion,
  obtenerDatosRegistroHabitacion,
  TBodyGuardarHabitacion,
} from "../../../../App/Alojamientos/Habitacion";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

const numeric = z
  .preprocess((val) => {
    if (typeof val === "string" && /^[0-9]+$/.test(val)) {
      return Number(val);
    }
    return val;
  }, z.number({ message: "Debe ser un número" }))
  .optional();

const habitacionSchema = z.object({
  nombre_tipologia: z.string().optional(),
  cantidad: numeric,

  cantidad_camas_doble: numeric,
  cantidad_camas_individual: numeric,
  cantidad_camas_sofa: numeric,

  cantidad_baños: numeric,
  bl_baño_compartido: z.boolean().optional(),
  bl_baño_adaptado: z.boolean().optional(),
  // características
  texto_observacion_comodidades_y_servicios_habitacion: z.string().optional(),

  caracteristicas: z.array(z.number()),
});

export type HabitacionesContextValue = {
  habitaciones: any[];
  datosRegistroHabitacion: any;
  habitacionSchema: typeof habitacionSchema;
  //habitacionForm: UseFormReturn<z.infer<typeof habitacionSchema>>;
  crearTipologia: () => Promise<void>;
  eliminarTipologia: (id: string) => Promise<void>;
  guardarTipologia: (body: TBodyGuardarHabitacion) => Promise<any>;
  habitacionesEsCompleta: boolean;
  habitacionesDirt: (v: boolean) => void;
  habitacionesIsDirty: boolean;
};

const useHabitacionesTab = ({ idOferta }: { idOferta: string }) => {
  const [habitaciones, setHabitaciones] = React.useState<any[]>([]);
  const [datosRegistroHabitacion, setDatosRegistroHabitacion] =
    React.useState<any>();
  const [esCompleta, setEsCompleta] = React.useState<boolean>(false);
  const [isDirty, setIsDirty] = React.useState<boolean>(false);

  const handleObtenerHabitaciones = () => {
    obtenerDatosRegistradosHabitacion(idOferta)
      .then((response: any) => {
        setHabitaciones(response.data.datos);
        setEsCompleta(
          response.data.datos.filter(
            (habitacion: any) => !habitacion.tipo_detalle
          ).length == 0
        );
      })
      .catch(() => {});
  };

  const handleObtenerDatosRegistro = () => {
    obtenerDatosRegistroHabitacion()
      .then((response) => {
        setDatosRegistroHabitacion(response.data);
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    handleObtenerHabitaciones();
    handleObtenerDatosRegistro();
  }, []);

  const crearTipologia = async () => {
    try {
      return await crearHabitacion(idOferta).then(() => {
        handleObtenerHabitaciones();
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const guardarTipologia = async (body: TBodyGuardarHabitacion) => {
    try {
      await guardarHabitacion(body);
      handleObtenerHabitaciones();
      return;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const eliminarTipologia = async (id: string) => {
    try {
      await eliminarHabitacion(id);
      handleObtenerHabitaciones();
      return;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  React.useEffect(() => {
    setEsCompleta(
      !isDirty &&
        habitaciones.filter((habitacion: any) => !habitacion.tipo_detalle)
          .length == 0
    );
  }, [isDirty]);

  const context: HabitacionesContextValue = {
    habitaciones,
    datosRegistroHabitacion,
    habitacionSchema,
    crearTipologia,
    eliminarTipologia,
    guardarTipologia,
    habitacionesEsCompleta: esCompleta,
    habitacionesDirt: (v: boolean) => setIsDirty(v),
    habitacionesIsDirty: isDirty,
  };
  return context;
};

export { useHabitacionesTab };
