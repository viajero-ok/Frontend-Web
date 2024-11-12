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
import { chevronForward, bookmark } from "ionicons/icons";
import { eliminarOfertaGuardada, guardarOfertaGuardada } from "../../App/Ofertas/Ofertas";

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
  const [selectedSegment, setSelectedSegment] = useState<
    "alojamientos" | "actividades" | "eventos"
  >("alojamientos");
  const [pos, setPos] = useState<{ lat: number; lgn: number } | null>(null);

  // const filteredOfertas = ofertas.filter((oferta) => {
  //   if (selectedSegment === "alojamientos")
  //     return oferta.tipo === "alojamiento";
  //   if (selectedSegment === "actividades") return oferta.tipo === "actividad";
  //   if (selectedSegment === "eventos") return oferta.tipo === "evento";
  //   return false;
  // });

  const posicionar = (latitud: number, longitud: number) => {
    setPos((_) => ({ lat: latitud, lgn: longitud }));
  };

  return (
    <div style={{ marginTop: "12pt" }}>
      <div>
        <IonSegment
          value={selectedSegment}
          onIonChange={(e) => setSelectedSegment(e.detail.value as any)}
        >
          <IonSegmentButton
            value="alojamientos"
            style={{ "--color-checked": "#F08408" }}
          >
            <IonLabel>Alojamientos</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            value="actividades"
            style={{ "--color-checked": "#F08408" }}
          >
            <IonLabel>Actividades</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            value="eventos"
            style={{ "--color-checked": "#F08408" }}
          >
            <IonLabel>Eventos</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </div>
      <IonGrid style={{}}>
        <IonRow style={{ paddingTop: "12pt" }}>
          <IonCol size="auto" style={{}}>
            <MapView
              setMarker={pos}
              style={{
                height: "200pt",
                width: "300pt",
                borderRadius: "16pt",
              }}
            />
            <FiltrosConsultaOfertas />
          </IonCol>
          <IonCol
            style={{
              paddingLeft: "12pt",
            }}
          >
            {props.ofertas.map((oferta) => (
              <OfertaCard
                key={oferta.id}
                oferta={oferta}
                posicionar={posicionar}
                fecha_desde={props.fechas.fecha_desde ?? ""}
                fecha_hasta={props.fechas.fecha_hasta ?? ""}
              />
            ))}
          </IonCol>
        </IonRow>
      </IonGrid>
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
    <IonCard
      style={{
        borderRadius: "16pt",
        marginBottom: "24pt",
        marginTop: 0,
      }}
    >
      <IonRow>
        <IonCol size="auto" style={{ padding: "20pt", paddingRight: 0 }}>
          <img
            src={`data:image/png;base64, ${oferta.ruta_imagen}`}
            alt={oferta.nombre_oferta}
            style={{
              width: "225pt",
              aspectRatio: "4/3",
              objectFit: "cover",
              objectPosition: "center center",
              cursor: "pointer",
            }}
          />
        </IonCol>
        <IonCol style={{ paddingTop: "12pt" }}>
          <IonCardHeader>
            <IonCardTitle
              style={{
                fontSize: "18pt",
                fontWeight: "bold",
                color: "#F08408",
                cursor: "pointer",
              }}
            >
              {oferta.nombre_oferta}
            </IonCardTitle>
            <IonCardSubtitle>
              <IonButton
                fill="clear"
                onClick={() =>
                  posicionar(
                    oferta.latitud as number,
                    oferta.longitud as number
                  )
                }
              >
                {oferta.localidad}
              </IonButton>
              &nbsp;
              <IonButton
                fill="clear"
                onClick={() =>
                  posicionar(
                    oferta.latitud as number,
                    oferta.longitud as number
                  )
                }
              >
                Mostrar en el mapa
              </IonButton>
            </IonCardSubtitle>
            <IonCardSubtitle>{oferta.descripcion}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{}}>
              <IonGrid title="ver disponibilidad" style={{}}>
                <StyledDiv
                  onClick={() =>
                    router.push(
                      `/ver-oferta/${oferta.id_oferta}/${fecha_desde}/${fecha_hasta}/${oferta.cantidad_personas}`
                    )
                  }
                >
                  <IonRow>
                    <IonCol>
                      <IonRow>{oferta.subtipo_oferta}</IonRow>
                      <IonRow>
                        {oferta.cantidad_baños} <span>&nbsp;baño</span>
                        {oferta.cantidad_baños > 1 && <span>s</span>}
                        {oferta.bl_baño_compartido ? (
                          <span>&nbsp;&bull;baño compartido</span>
                        ) : null}
                        {oferta.bl_baño_adaptado ? (
                          <span>&nbsp;&bull; baño adaptado</span>
                        ) : null}
                      </IonRow>
                      <IonRow>
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
                      </IonRow>
                    </IonCol>
                    <IonCol
                      style={{
                        display: "flex",
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "right",
                      }}
                    >
                      <div>
                        <IonRow>
                          {oferta.noches_estadia} noche
                          {oferta.noches_estadia > 1 ? "s" : ""},
                          {oferta.cantidad_personas} persona
                          {oferta.cantidad_personas > 1 ? "s" : ""}
                        </IonRow>
                        <IonRow
                          style={{ fontSize: "16pt", fontWeight: "bold" }}
                        >
                          AR$ {oferta.precios_desde.replace(".", ",")}
                        </IonRow>
                        <IonRow>+ impuestos y tazas</IonRow>
                      </div>
                    </IonCol>
                  </IonRow>
                </StyledDiv>
              </IonGrid>
            </div>
          </IonCardContent>
        </IonCol>
      </IonRow>
      <IonIcon
        icon={bookmark}
        style={{
          position: "absolute",
          right: "20pt",
          top: "20pt",
          fontSize: "24px",
          cursor: "pointer",
          color: isFavorite ? "#53992B" : "#999",
        }}
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
    </IonCard>
  );
}
