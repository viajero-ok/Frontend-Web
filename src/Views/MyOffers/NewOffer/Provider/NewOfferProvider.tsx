import React from "react";
import { obtenerEstablecimientos } from "../../../../App/Establecimientos/Establecimientos";
import { registrarNuevaActividad as registrarNuevaActividadService } from "../../../../App/Actividades/Actividad";
import { registrarNuevoEvento as registrarNuevoEventoService } from "../../../../App/Eventos/Eventos";

type NewOfferContextValue = {
  establecimientos: any[];
  tipoOferta: TipoOferta | null;
  setTipoOferta: React.Dispatch<React.SetStateAction<TipoOferta | null>>;
  registrarActividad: (id_establecimiento: number | null) => Promise<any>;
  registrarEvento: (id_establecimiento: number | null) => Promise<any>;
};

const NewOfferContext = React.createContext<NewOfferContextValue>(
  {} as NewOfferContextValue
);

type TipoOferta = "alojamiento" | "actividad" | "evento";

const NewOfferProvider = ({ children }: { children: React.ReactNode }) => {
  const [establecimientos, setEstablecimientos] = React.useState<any[]>([]);
  const [tipoOferta, setTipoOferta] = React.useState<TipoOferta | null>(null);

  React.useEffect(() => {
    obtenerEstablecimientos().then((response: any) => {
      const establecimientos = response.establecimientos;
      establecimientos.unshift({
        id_establecimiento: null,
        nombre: "Sin establecimiento",
      });
      setEstablecimientos(establecimientos);
    });
  }, []);

  const registrarActividad = async (id_establecimiento: number | null) => {
    return await registrarNuevaActividadService({
      id_tipo_oferta: 2,
      id_establecimiento,
    });
  };

  const registrarEvento = async (id_establecimiento: number | null) => {
    return await registrarNuevoEventoService({
      id_tipo_oferta: 3,
      id_establecimiento,
    });
  };

  const ctx: NewOfferContextValue = {
    establecimientos,
    tipoOferta,
    setTipoOferta,
    registrarActividad,
    registrarEvento,
  };
  return (
    <NewOfferContext.Provider value={ctx}>{children}</NewOfferContext.Provider>
  );
};

const useNewOffer = () => {
  const ctx = React.useContext(NewOfferContext);
  return ctx;
};

export { NewOfferProvider, useNewOffer };
