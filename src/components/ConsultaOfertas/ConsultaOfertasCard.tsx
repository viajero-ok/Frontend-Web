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
  IonImg,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useEffect, useState } from "react";
import MapView from "../MapView/MapView";
import FiltrosConsultaOfertas from "./FiltrosConsultaOfertas";
import { chevronForward } from "ionicons/icons";

interface Oferta {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  fecha: string;
  tipo: "alojamiento" | "actividad" | "evento";
  imagen: string;
}

export default function ConsultaOfertasCard() {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<
    "alojamientos" | "actividades" | "eventos"
  >("alojamientos");

  useEffect(() => {
    // Aquí deberías hacer la llamada a tu API para obtener las ofertas
    // Por ahora, usaremos datos de ejemplo
    const ofertasEjemplo: Oferta[] = [
      {
        id: 1,
        titulo: "Cabañas de la Colina",
        descripcion: "Habitación doble",
        precio: 100,
        fecha: "2023-05-01",
        tipo: "alojamiento",
        imagen: "public/images/cabaña1.png",
      },
      {
        id: 4,
        titulo: "Böden Hotel & Spa",
        descripcion: "Música en vivo",
        precio: 30,
        fecha: "2023-05-03",
        tipo: "alojamiento",
        imagen: "public/images/hotel.jpg",
      },
      /* { id: 2, titulo: "Reserva Natural Pozo Verde", descripcion: "Recorrido guiado", precio: 50, fecha: "2023-05-02", tipo: 'actividad' },
            { id: 5, titulo: "Concierto en la playa", descripcion: "Música en vivo", precio: 30, fecha: "2023-05-03", tipo: 'actividad' },
            { id: 3, titulo: "Concierto en la playa", descripcion: "Música en vivo", precio: 30, fecha: "2023-05-03", tipo: 'evento' },
            { id: 6, titulo: "Concierto en la playa", descripcion: "Música en vivo", precio: 30, fecha: "2023-05-03", tipo: 'evento' }, */
    ];
    setOfertas(ofertasEjemplo);
  }, []);

  const filteredOfertas = ofertas.filter((oferta) => {
    if (selectedSegment === "alojamientos")
      return oferta.tipo === "alojamiento";
    if (selectedSegment === "actividades") return oferta.tipo === "actividad";
    if (selectedSegment === "eventos") return oferta.tipo === "evento";
    return false;
  });

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
            {filteredOfertas.map((oferta) => (
              <OfertaCard key={oferta.id} oferta={oferta} />
            ))}
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
}

function OfertaCard({ oferta }: { oferta: Oferta }) {
  return (
    <IonCard
      style={{ borderRadius: "16pt", marginBottom: "24pt", marginTop: 0 }}
    >
      <IonRow>
        <IonCol size="auto" style={{ padding: "20pt", paddingRight: 0 }}>
          <img
            src={oferta.imagen}
            alt={oferta.titulo}
            style={{
              width: "250pt",
              objectFit: "cover",
              aspectRatio: "1/1",
              objectPosition: "center center",
              borderRadius: "8pt",
              cursor: "pointer"
            }}
          />
        </IonCol>
        <IonCol style={{ paddingTop: "12pt" }}>
          <IonCardHeader>
            <IonCardTitle
              style={{
                fontSize: "24pt",
                fontWeight: "bold",
                color: "#F08408",
                cursor: "pointer",
              }}
            >
              {oferta.titulo}
            </IonCardTitle>
            <IonCardSubtitle>
              <IonButton fill="clear">Villa Carlos Paz</IonButton>&nbsp;
              <IonButton fill="clear">Mostrar en el mapa</IonButton>
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{}}>
              <IonGrid style={{ borderLeft: "3pt solid lightgray" }}>
                <IonRow>
                  <IonCol>
                    <IonRow>Cabaña</IonRow>
                    <IonRow>1 habitación &bull; 1 living &bull; 1 baño</IonRow>
                    <IonRow>3 camas (1 doble, 1 single, 1 sofá)</IonRow>
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
                      <IonRow>3 noches, 2 personas</IonRow>
                      <IonRow style={{ fontSize: "16pt", fontWeight: "bold" }}>
                        AR$ 300,500
                      </IonRow>
                      <IonRow>+ impuestos y tazas</IonRow>
                    </div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </IonCardContent>
        </IonCol>
      </IonRow>
      <IonButton
        style={{
          "--background": "#F08408",
          "--color": "white",
          position: "absolute",
          float: "right",
          right: "20pt",
          bottom: "20pt",
        }}
      >
        Ver disponibilidad&nbsp;
        <IonIcon icon={chevronForward} />
      </IonButton>
    </IonCard>
  );
}
