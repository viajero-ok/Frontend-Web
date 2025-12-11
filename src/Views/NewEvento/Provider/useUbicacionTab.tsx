import React from "react";
import { LatLng } from "leaflet";
import {
  obtenerDatosRegistradosUbicacion,
  guardarUbicacion as guardarUbicacionService,
  TBodyGuardarUbicacion,
} from "../../../App/Actividades/Ubicacion";
import { obtenerUbicacionEstablecimiento } from "../../../App/Actividades/Actividad";
import { getUbicaciones } from "../../../App/Ubicaciones/Ubicaciones";
import { z } from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type UbicacionContextValue = {
  ubicacionesDomicilio: {
    provincias: any[];
    departamentos: any[];
    localidades: any[];
  };
  ubicacionEstablecimiento: LatLng | null;
  guardarUbicacion: (body: TBodyGuardarUbicacion) => Promise<void>;
  datosRegistradosUbicacion: any;
  actualizarUbicacion: () => void;
  ubicacionEsCompleta: boolean;
  ubicacionSchema: typeof ubicacionSchema;
  ubicacionForm: UseFormReturn<z.infer<typeof ubicacionSchema>>;
};

const ubicacionSchema = z.object({
  calle: z.string({ message: "El campo es requerido" }),
  sin_numero: z.boolean().optional(),
  numero: z.string({ message: "El campo es requerido" }),
  id_localidad: z.number({ message: "El campo es requerido" }),
  id_departamento: z.number({ message: "El campo es requerido" }),
  id_provincia: z.number({ message: "El campo es requerido" }),
  ubicacion: z.object(
    {
      latitud: z.number(),
      longitud: z.number(),
    },
    {
      message: "La ubicación es requerida.",
    }
  ),
  observaciones: z.string().optional().nullable(),
});

const useUbicacionTab = ({ idOferta }: { idOferta: string }) => {
  const [ubicacionEstablecimiento, setUbicacionEstablecimiento] =
    React.useState<LatLng | null>(null);
  const [provincias, setProvincias] = React.useState<any[]>([]);
  const [departamentos, setDepartamentos] = React.useState<any[]>([]);
  const [localidades, setLocalidades] = React.useState<any[]>([]);
  const [datosRegistradosUbicacion, setDatosRegistradosUbicacion] =
    React.useState<any>();
  const [ubicacionEsCompleta, setUbicacionEsCompleta] =
    React.useState<boolean>(false);

  const ubicacionForm = useForm<z.infer<typeof ubicacionSchema>>({
    resolver: zodResolver(ubicacionSchema),
    mode: "onSubmit",
    defaultValues: {
      sin_numero: false,
    },
  });

  const actualizarUbicacion = () => {
    obtenerUbicacionEstablecimiento(idOferta)
      .then((response: any) => {
        setUbicacionEstablecimiento(
          response.data.datos_ubicacion.sin_establecimiento
            ? null
            : new LatLng(
                parseFloat(response.data.datos_ubicacion.latitud),
                parseFloat(response.data.datos_ubicacion.longitud)
              )
        );
      })
      .catch(() => {});

    obtenerDatosRegistradosUbicacion(idOferta)
      .then((response) => {
        setDatosRegistradosUbicacion(response.data.datos_ubicacion);
        ubicacionForm.reset({
          calle: response.data.datos_ubicacion.nombre_calle,
          numero: response.data.datos_ubicacion.numero,
          id_provincia: response.data.datos_ubicacion.id_provincia,
          id_departamento: response.data.datos_ubicacion.id_departamento,
          id_localidad: response.data.datos_ubicacion.id_localidad,
          ubicacion: {
            latitud: parseFloat(response.data.datos_ubicacion.latitud),
            longitud: parseFloat(response.data.datos_ubicacion.longitud),
          },
          sin_numero:
            response.data.datos_ubicacion.sin_numero == "1" ? true : false,
          observaciones: response.data.datos_ubicacion.observacion,
        });
      })
      .catch(() => {});
  };

  const guardarUbicacion = async (body: TBodyGuardarUbicacion) => {
    try {
      await guardarUbicacionService(body);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  React.useEffect(() => {
    getUbicaciones().then((response) => {
      setProvincias(response.data.ubicaciones.provincias);
      setDepartamentos(response.data.ubicaciones.departamentos);
      setLocalidades(response.data.ubicaciones.localidades);

      actualizarUbicacion();
    });
  }, []);

  React.useEffect(() => {
    if (!datosRegistradosUbicacion) return;
    // TODO manejar cuando venga con usarUbiEst como true
    setUbicacionEsCompleta(
      ubicacionSchema.safeParse({
        calle: datosRegistradosUbicacion.nombre_calle,
        numero: datosRegistradosUbicacion.numero,
        id_provincia: datosRegistradosUbicacion.id_provincia,
        id_departamento: datosRegistradosUbicacion.id_departamento,
        id_localidad: datosRegistradosUbicacion.id_localidad,
        ubicacion: {
          latitud: parseFloat(datosRegistradosUbicacion.latitud),
          longitud: parseFloat(datosRegistradosUbicacion.longitud),
        },
        sin_numero: datosRegistradosUbicacion.sin_numero == "1" ? true : false,
        observaciones: datosRegistradosUbicacion.observacion,
      }).success
    );
  }, [datosRegistradosUbicacion]);

  const context: UbicacionContextValue = {
    ubicacionesDomicilio: {
      provincias,
      departamentos,
      localidades,
    },
    ubicacionEstablecimiento,
    guardarUbicacion,
    datosRegistradosUbicacion,
    actualizarUbicacion,
    ubicacionEsCompleta,
    ubicacionSchema,
    ubicacionForm,
  };

  return context;
};

export { useUbicacionTab };
