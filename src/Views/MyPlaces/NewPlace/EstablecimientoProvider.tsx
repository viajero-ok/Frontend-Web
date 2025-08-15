import React from "react";
import {
  obtenerDatosRegistradosEstablecimiento,
  TBodyActualizarEstablecimiento,
  TBodyRegistrarEstablecimiento,
} from "../../../App/Establecimientos/Establecimientos";
import { EstablecimientoModel } from "../../../App/Establecimientos/Establecimientos.Models";
import {
  actualizarEstablecimiento as actualizarEstablecimientoService,
  registrarEstablecimiento as registrarEstablecimientoService,
  eliminarEstablecimiento as eliminarEstablecimientoService,
} from "../../../App/Establecimientos/Establecimientos";

type EstablecimientoContextValue = {
  idEstablecimiento: number | null /** id = null cuando es nuevo */;
  datosRegistradosEstablecimiento?: EstablecimientoModel;
  registrarEstablecimiento: (
    body: TBodyRegistrarEstablecimiento
  ) => Promise<{ id_establecimiento: number }>;
  actualizarEstablecimiento: (
    body: TBodyActualizarEstablecimiento
  ) => Promise<void>;
  eliminarEstablecimiento: (idEstablecimiento: number) => Promise<void>;
  actualizar: () => void;
};

const EstablecimientoContext = React.createContext<EstablecimientoContextValue>(
  {} as EstablecimientoContextValue
);

const EstablecimientoProvider = ({
  idEstablecimiento,
  children,
}: {
  idEstablecimiento: number | null;
  children: React.ReactNode;
}) => {
  const [datosRegistradosEstablecimiento, setDatosRegistradosEstablecimiento] =
    React.useState<EstablecimientoModel>();

  const actualizar = () => {
    if (!idEstablecimiento) return;
    obtenerDatosRegistradosEstablecimiento(idEstablecimiento)
      .then((response: EstablecimientoModel) => {
        setDatosRegistradosEstablecimiento(response);
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    actualizar();
  }, []);

  const registrarEstablecimiento = async (
    body: TBodyRegistrarEstablecimiento
  ) => {
    try {
      return (await registrarEstablecimientoService(body)).data
        .id_establecimiento;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const actualizarEstablecimiento = async (
    body: TBodyActualizarEstablecimiento
  ) => {
    try {
      await actualizarEstablecimientoService(body);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const eliminarEstablecimiento = async (idEstablecimiento: number) => {
    try {
      await eliminarEstablecimientoService(idEstablecimiento);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const context: EstablecimientoContextValue = {
    idEstablecimiento,
    datosRegistradosEstablecimiento,
    registrarEstablecimiento,
    actualizarEstablecimiento,
    eliminarEstablecimiento,
    actualizar,
  };
  return (
    <EstablecimientoContext.Provider value={context}>
      {children}
    </EstablecimientoContext.Provider>
  );
};

const useEstablecimiento = () => {
  const context = React.useContext(EstablecimientoContext);
  if (!context)
    throw new Error(
      "useEstablecimiento must be used within <EstablecimientoProvider></EstablecimientoProvider>"
    );

  return context;
};

export { EstablecimientoProvider, useEstablecimiento };
