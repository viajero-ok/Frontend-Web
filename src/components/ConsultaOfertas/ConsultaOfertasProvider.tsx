import * as React from "react";
import { consultarOfertasTurista } from "../../App/Ofertas/Ofertas";

type Oferta = {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  fecha: string;
  tipo: "alojamiento" | "actividad" | "evento";
  imagen: string;
  //setOfertasGuardadas?: React.Dispatch<React.SetStateAction<any[]>>;
};

type ConsultaOfertasContextValue = {
  localidad: number | null;
  setLocalidad: React.Dispatch<React.SetStateAction<number | null>>;
  fechas: any;
  setFechas: React.Dispatch<React.SetStateAction<any>>;
  personas: number;
  setPersonas: React.Dispatch<React.SetStateAction<number>>;
  alojamientos: Oferta[];
  actividades: any[];
  buscar: () => void;
};

const ConsultaOfertasContext = React.createContext<ConsultaOfertasContextValue>(
  {} as ConsultaOfertasContextValue
);

const ConsultaOfertasProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [localidad, setLocalidad] = React.useState<number | null>(null);
  const [fechas, setFechas] = React.useState<any>(null);
  const [personas, setPersonas] = React.useState<number>(1);
  const [alojamientos, setAlojamientos] = React.useState<Oferta[]>([]);
  const [actividades, setActividaes] = React.useState<any[]>([]);
  const [eventos, setEventos] = React.useState<any[]>([]);

  const buscar = () => {
    if (!fechas) return;
    if (
      fechas.fecha_desde == null ||
      fechas.fecha_hasta == null ||
      personas == null
    )
      return;
    consultarOfertasTurista({
      pagina: 1,
      limite: 10,
      id_tipo_oferta: 1,
      fecha_desde: fechas.fecha_desde,
      fecha_hasta: fechas.fecha_hasta,
      cantidad_personas: personas,
    })
      .then((response: any) => {
        setAlojamientos(response.data);
      })
      .catch(() => {});
    consultarOfertasTurista({
      pagina: 1,
      limite: 10,
      id_tipo_oferta: 2,
      fecha_desde: fechas.fecha_desde,
      fecha_hasta: fechas.fecha_hasta,
      cantidad_personas: personas,
    })
      .then((response: any) => {
        setActividaes(response.data);
      })
      .catch(() => {});
  };

  const context: ConsultaOfertasContextValue = {
    localidad,
    setLocalidad,
    fechas,
    setFechas,
    personas,
    setPersonas,
    alojamientos,
    actividades,
    buscar,
  };
  return (
    <ConsultaOfertasContext.Provider value={context}>
      {children}
    </ConsultaOfertasContext.Provider>
  );
};

const useConsultaOfertas = () => {
  const context = React.useContext(ConsultaOfertasContext);
  return context;
};

export { ConsultaOfertasProvider, useConsultaOfertas };
