import * as React from "react";
import {
  obtenerDatosRegistroPublicacion,
  crearTarifa as crearTarifaService,
  eliminarTarifa as eliminarTarifaService,
  TBodyCrearTarifa,
  obtenerTarifas,
  TBodyActualizarTarifa,
  actualizarTarifa,
} from "../../../../App/Publicaciones/PublicacionesAlojamientos";

type PublicarOfertaContextValue = {
  idOferta: string;
  tipologias: any[];
  tarifas: any[];
  actualizar: () => Promise<void>;
  crearTarifa: (body: TBodyCrearTarifa) => Promise<void>;
  guardarTarifa: (body: TBodyActualizarTarifa) => Promise<void>;
  eliminarTarifa: (idTarifa: number) => Promise<void>;
};

const PublicarOfertaContext = React.createContext<PublicarOfertaContextValue>(
  {} as PublicarOfertaContextValue
);

const PublicarOfertaProvider = ({
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
      await obtenerDatosRegistroPublicacion(idOferta).then((response: any) => {
        setTipologias(response.data.tipos_detalles);
      });
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

  const crearTarifa = async (body: TBodyCrearTarifa) => {
    try {
      await crearTarifaService(body);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const guardarTarifa = async (body: TBodyActualizarTarifa) => {
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
    <PublicarOfertaContext.Provider value={context}>
      {children}
    </PublicarOfertaContext.Provider>
  );
};

const usePublicarOferta = () => {
  const context = React.useContext(PublicarOfertaContext);
  if (!context) {
    throw new Error(
      "usePublicarOferta should be used within <PublicarOfertaProvider></PublicarOfertaProvider>"
    );
  }

  return { ...context };
};

export { PublicarOfertaProvider, usePublicarOferta };
