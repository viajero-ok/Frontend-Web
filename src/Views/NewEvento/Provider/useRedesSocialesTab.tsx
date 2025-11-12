import React from "react";
import {
  obtenerDatosRegistroRedesSociales,
  registrarRedSocial,
  eliminarRedSocial as eliminarRedSocialService,
  TBodyEliminarRedSocial,
  TBodyRegistrarRedSocial,
} from "../../../App/RedesSociales/RedesSociales";

export type RedesSocialesTabContextValue = {
  agregarRedSocial: (redSocial: TBodyRegistrarRedSocial) => Promise<any>;
  eliminarRedSocial: (redSocial: TBodyEliminarRedSocial) => Promise<any>;
  datosRegistroRedes: { redesSociales: any[] };
};

const useRedesSocialesTab = ({ idOferta }: { idOferta: string }) => {
  const [listaRedes, setListaRedes] = React.useState<any[]>([]);

  const actualizarRedesSociales = () => {};

  React.useEffect(() => {
    obtenerDatosRegistroRedesSociales()
      .then((response) => {
        setListaRedes(response.data.redes_sociales);
      })
      .catch(() => {});
    actualizarRedesSociales();
  }, []);

  const agregarRedSocial = async (redSocial: TBodyRegistrarRedSocial) => {
    return await registrarRedSocial({
      ...redSocial,
    });
  };

  const actualizarRedSocial = async () => {};

  const eliminarRedSocial = async (redSocial: TBodyEliminarRedSocial) => {
    return await eliminarRedSocialService({ ...redSocial });
  };

  const context: RedesSocialesTabContextValue = {
    agregarRedSocial,
    eliminarRedSocial,
    datosRegistroRedes: { redesSociales: listaRedes },
  };
  return context;
};

export { useRedesSocialesTab };
