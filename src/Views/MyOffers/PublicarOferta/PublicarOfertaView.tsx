import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonRow,
} from "@ionic/react";
import Tarifas from "./Tarifas/Tarifas";

export default function PublicarOfertaView() {
  return (
    <IonContent>
      <IonGrid>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20pt",
          }}
        >
          <h3 style={{ fontSize: "24pt", fontWeight: "bold" }}>
            Publicar oferta
          </h3>
        </IonRow>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonCard style={{ display: "flex", flexDirection: "row" }}>
            <img
              src="/images/hotel.jpg"
              alt="Imagen de la oferta"
              style={{
                width: "200pt",
                aspectRatio: "1/1",
                margin: "20pt",
                borderRadius: "8pt",
              }}
            />
            <IonCardHeader style={{ marginTop: "20pt" }}>
              <IonCardTitle style={{ fontSize: "24pt", fontWeight: "bold" }}>
                La posada del emi
              </IonCardTitle>
              <IonCardSubtitle style={{ fontSize: "14pt" }}>
                Descripción: Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ips
              </IonCardSubtitle>
            </IonCardHeader>
          </IonCard>
        </IonRow>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20pt",
          }}
        >
          <h3 style={{ fontSize: "16pt", fontWeight: "bold" }}>
            Vigencia de la publicación
          </h3>
        </IonRow>
        <IonRow style={{ border: "2pt solid red" }}>
          <Tarifas />
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
