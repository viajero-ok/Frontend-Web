import * as React from "react";
import {
  obtenerDatosRegistroPublicacionActividad,
  obtenerTarifas,
} from "../../../../App/Publicaciones/PublicacionesAlojamientos";
import {
  TBodyActualizarTarifaActividad,
  TBodyCrearTarifaActividad,
  crearTarifaActividad as crearTarifaService,
  eliminarTarifaActividad as eliminarTarifaService,
  actualizarTarifaActividad as actualizarTarifa,
} from "../../../../App/Publicaciones/PublicacionesActividades";

type PublicarActividadContextValue = {
  idOferta: string;
  tipologias: any[];
  tarifas: any[];
  actualizar: () => Promise<void>;
  crearTarifa: (body: TBodyCrearTarifaActividad) => Promise<void>;
  guardarTarifa: (body: TBodyActualizarTarifaActividad) => Promise<void>;
  eliminarTarifa: (idTarifa: number) => Promise<void>;
};

const PublicarActividadContext =
  React.createContext<PublicarActividadContextValue>(
    {} as PublicarActividadContextValue
  );

const PublicarActividadProvider = ({
  children,
  idOferta,
}: {
  children: React.ReactNode;
  idOferta: string;
}) => {
  const [tipologias, setTipologias] = React.useState<any[]>([]);
  const [tarifas, setTarifas] = React.useState<any[]>([]);

  const obtenerTipologias = async () => {
    try {
      await obtenerDatosRegistroPublicacionActividad(idOferta).then(
        (response: any) => {
          console.log("response: ", response.data.tipos_detalle);
          setTipologias(response.data.tipos_detalle);
        }
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const actualizar = async () => {
    try {
      const tarifas = (await obtenerTarifas(idOferta)).data;
      setTarifas(tarifas.datos_tarifas ?? []);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const crearTarifa = async (body: TBodyCrearTarifaActividad) => {
    try {
      await crearTarifaService(body);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const guardarTarifa = async (body: TBodyActualizarTarifaActividad) => {
    try {
      await actualizarTarifa(body);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const eliminarTarifa = async (idTarifa: number) => {
    try {
      await eliminarTarifaService(idTarifa);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  React.useEffect(() => {
    obtenerTipologias();
    actualizar();
  }, []);

  const context = {
    idOferta,
    tipologias,
    tarifas,
    actualizar,
    crearTarifa,
    guardarTarifa,
    eliminarTarifa,
  };
  return (
    <PublicarActividadContext.Provider value={context}>
      {children}
    </PublicarActividadContext.Provider>
  );
};

const usePublicarActividad = () => {
  const context = React.useContext(PublicarActividadContext);
  if (!context) {
    throw new Error(
      "usePublicarOferta should be used within <PublicarOfertaProvider></PublicarOfertaProvider>"
    );
  }

  return { ...context };
};

export { PublicarActividadProvider, usePublicarActividad };
