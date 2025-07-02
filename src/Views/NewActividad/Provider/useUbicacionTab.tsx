import React from "react";
import { LatLng } from "leaflet";
import {
  obtenerDatosRegistradosUbicacion,
  guardarUbicacion as guardarUbicacionService,
  TBodyGuardarUbicacion,
} from "../../../App/Actividades/Ubicacion";
import { obtenerUbicacionEstablecimiento } from "../../../App/Actividades/Actividad";
import { getUbicaciones } from "../../../App/Ubicaciones/Ubicaciones";

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
};

const useUbicacionTab = ({ idOferta }: { idOferta: string }) => {
  const [ubicacionEstablecimiento, setUbicacionEstablecimiento] =
    React.useState<LatLng | null>(null);
  const [provincias, setProvincias] = React.useState<any[]>([]);
  const [departamentos, setDepartamentos] = React.useState<any[]>([]);
  const [localidades, setLocalidades] = React.useState<any[]>([]);
  const [datosRegistradosUbicacion, setDatosRegistradosUbicacion] =
    React.useState<any>();

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
    actualizarUbicacion();

    getUbicaciones().then((response) => {
      setProvincias(response.data.ubicaciones.provincias);
      setDepartamentos(response.data.ubicaciones.departamentos);
      setLocalidades(response.data.ubicaciones.localidades);
    });
  }, []);

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
  };

  return context;
};

export { useUbicacionTab };
