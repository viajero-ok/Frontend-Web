import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
  useIonRouter,
} from "@ionic/react";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { consultarOfertasTurista } from "../../App/Ofertas/Ofertas";
import MapView from "../MapView/MapView";
import FiltrosConsultaOfertas from "./FiltrosConsultaOfertas";
import { chevronForward, bookmark, location, locate } from "ionicons/icons";
import {
  eliminarOfertaGuardada,
  guardarOfertaGuardada,
} from "../../App/Ofertas/Ofertas";
import { cn } from "../ui/Form/Field";
import { Segment } from "../../Views/NewAlojamiento/EnHabitaciones/NewAlojamientoEnHabitacionesView";

interface Oferta {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  fecha: string;
  tipo: "alojamiento" | "actividad" | "evento";
  imagen: string;
  setOfertasGuardadas?: React.Dispatch<React.SetStateAction<any[]>>;
}

type TConsultaOfertasCard = {
  fechas: { fecha_desde: string | null; fecha_hasta: string | null };
  personas: number | null;
  ofertas: any[];
  setOfertasGuardadas?: React.Dispatch<React.SetStateAction<any[]>>;
};
export default function ConsultaOfertasCard(props: TConsultaOfertasCard) {
  const [selectedSegment, setSelectedSegment] =
    useState<string>("alojamientos");
  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(null);
  
  // const filteredOfertas = ofertas.filter((oferta) => {
  //   if (selectedSegment === "alojamientos")
  //     return oferta.tipo === "alojamiento";
  //   if (selectedSegment === "actividades") return oferta.tipo === "actividad";
  //   if (selectedSegment === "eventos") return oferta.tipo === "evento";
  //   return false;
  // });

  const posicionar = (latitud: number, longitud: number) => {
    setPos((_) => ({ lat: latitud, lng: longitud }));
  };

  return (
    <div className="flex flex-row gap-4 mt-6 w-full justify-center">
      <div style={{}}>
        <MapView
          setMarker={pos}
          // style={{
          //   height: "200pt",
          //   width: "300pt",
          //   borderRadius: "16pt",
          // }}
          className="w-[300pt] aspect-video rounded-md border border-[#bbb] hover:border-black"
        />
        <FiltrosConsultaOfertas />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-2 mb-4 w-full">
          <Segment
            segment={selectedSegment}
            label="Alojamientos"
            value={"alojamientos"}
            set={setSelectedSegment}
            className="w-full flex flex-row justify-center"
          />
          <Segment
            segment={selectedSegment}
            label="Actividades"
            value="actividades"
            set={setSelectedSegment}
            className="w-full flex flex-row justify-center"
          />
          <Segment
            segment={selectedSegment}
            label="Eventos"
            value="eventos"
            set={setSelectedSegment}
            className="w-full flex flex-row justify-center"
          />
        </div>
        {selectedSegment == "alojamientos" &&
          props.ofertas.map((oferta) => (
            <OfertaCard
              key={oferta.id}
              oferta={oferta}
              posicionar={posicionar}
              fecha_desde={props.fechas.fecha_desde ?? ""}
              fecha_hasta={props.fechas.fecha_hasta ?? ""}
            />
          ))}
      </div>
    </div>
  );
}

const StyledDiv = styled.div`
  border-left: 3pt solid lightgray;
  transition-duration: 0.25s;
  cursor: pointer;

  &:hover {
    box-shadow: 2pt 2pt 3pt lightgray;
  }
`;

export function OfertaCard({
  oferta,
  fecha_desde,
  fecha_hasta,
  posicionar,
  setOfertasGuardadas,
}: {
  oferta: any;
  fecha_desde: string;
  fecha_hasta: string;
  posicionar: (latitud: number, longitud: number) => void;
  setOfertasGuardadas?: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const router = useIonRouter();

  const [isFavorite, setIsFavorite] = useState(false);

  const handleGuardarOferta = async (id: number) => {
    setIsFavorite(true);

    if (setOfertasGuardadas) {
      setOfertasGuardadas((prev: any[]) => [...prev, oferta]);
    }

    try {
      await guardarOfertaGuardada({ id_oferta: oferta.id_oferta });
      console.log("Oferta guardada:", id);
    } catch (error) {
      console.error("Error al guardar la oferta:", error);
    }
  };

  const handleEliminarGuardado = () => {
    if (!oferta.id) return;
    eliminarOfertaGuardada(oferta.id)
      .then(() => {
        setIsFavorite(false);
        if (setOfertasGuardadas) {
          setOfertasGuardadas((prev: any[]) =>
            prev.filter((item: any) => item.id_oferta !== oferta.id)
          );
        }
      })
      .catch(() => {});
    console.log("Eliminando oferta guardada:", oferta.id);
  };

  return (
    <div className="relative flex flex-row gap-4 p-4 border border-gray-200 rounded-md">
      <img
        src={`data:image/png;base64, ${oferta.ruta_imagen}`}
        alt={oferta.nombre_oferta}
        style={{
          width: "225pt",
          aspectRatio: "4/3",
          objectFit: "cover",
          objectPosition: "center center",
        }}
      />

      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col items-start">
            <div className="flex flex-row gap-2">
              <button
                onClick={() =>
                  posicionar(
                    oferta.latitud as number,
                    oferta.longitud as number
                  )
                }
                className="cursor-pointer hover:underline text-xs text-gray-600 mb-1"
              >
                <IonIcon icon={location} /> {oferta.localidad}
              </button>
              <button
                onClick={() =>
                  posicionar(
                    oferta.latitud as number,
                    oferta.longitud as number
                  )
                }
                className="cursor-pointer hover:underline text-xs text-gray-600 mb-1"
              >
                <IonIcon icon={locate} /> Mostrar en el mapa
              </button>
            </div>
            <div className="text-3xl font-bold text-gray-600">
              {oferta.nombre_oferta}
            </div>
          </div>
          <div className="text-sm text-gray-600">{oferta.descripcion}</div>
        </div>
        <div
          className={cn(
            "flex flex-row justify-between w-full mt-2 border border-gray-200 rounded-md p-2",
            "cursor-pointer hover:shadow-sm hover:border-black"
          )}
        >
          <div className="flex flex-col text-gray-600 text-sm justify-center">
            <div>{oferta.subtipo_oferta}</div>
            <div>
              {oferta.cantidad_baños} <span>&nbsp;baño</span>
              {oferta.cantidad_baños > 1 && <span>s</span>}
              {oferta.bl_baño_compartido ? (
                <span>&nbsp;&bull;&nbsp;baño compartido</span>
              ) : null}
              {oferta.bl_baño_adaptado ? (
                <span>&nbsp;&bull;&nbsp;baño adaptado</span>
              ) : null}
            </div>
            <div>
              {oferta.camas_cantidad.reduce(
                (acumulador: number, valorActual: any) =>
                  acumulador + valorActual.cantidad,
                0
              )}
              &nbsp; cama
              {oferta.camas_cantidad.reduce(
                (acumulador: number, valorActual: any) =>
                  acumulador + valorActual.cantidad,
                0
              ) > 1 && "s"}
              &nbsp; (
              {oferta.camas_cantidad.map(
                (cama: any, index: number) =>
                  `${index != 0 ? ", " : ""}` +
                  cama.cantidad +
                  " " +
                  cama.nombre_cama
              )}
              )
            </div>
          </div>
          <div className="">
            <div className="flex flex-col items-end">
              <div className="text-xs text-gray-600">
                {oferta.noches_estadia} noche
                {oferta.noches_estadia > 1 ? "s" : ""},
                {oferta.cantidad_personas} persona
                {oferta.cantidad_personas > 1 ? "s" : ""}
              </div>
              <div className="">
                <span className="text-sm text-gray-600">AR$ </span>
                <span className="text-3xl text-gray-600 font-bold">
                  {oferta.precios_desde.split(".")[0]}
                </span>
                <span className="text-sm text-gray-600">
                  .{oferta.precios_desde.split(".")[1]}
                </span>
              </div>
              <div className="text-xs text-gray-500 italic">
                + impuestos y tazas
              </div>
            </div>
          </div>
        </div>
      </div>
      <IonIcon
        icon={bookmark}
        className={cn(
          "cursor-pointer absolute right-4 top-4 text-3xl",
          isFavorite ? "text-gray-600" : "text-gray-200"
        )}
        onClick={() => {
          const nuevoEstado = !isFavorite;
          setIsFavorite(nuevoEstado);

          if (nuevoEstado) {
            handleGuardarOferta(oferta.id_oferta);
            console.log("Guardando oferta:", oferta.id_oferta);
          } else {
            handleEliminarGuardado();
          }
        }}
      />
    </div>
  );
}
