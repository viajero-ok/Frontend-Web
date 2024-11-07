import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import {
  chatbox,
  compass,
  flash,
  location,
  logoUsd,
  pin,
  radioButtonOff,
  star,
  walk,
} from "ionicons/icons";

export default function VerOfertaView() {
  return (
    <IonContent>
      <IonGrid>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IonCard style={{ display: "inline-block" }}>
            <IonCardHeader
              style={{
                display: "flex",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "12pt",
                paddingLeft: "24pt",
                paddingRight: "24pt",
              }}
            >
              <IonCardTitle style={{ fontWeight: "bold", fontSize: "20pt" }}>
                Reserva natural tero violado
              </IonCardTitle>
              <IonCardSubtitle
                style={{
                  fontSize: "12pt",
                  display: "flex",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IonIcon icon={location} style={{ fontSize: "16pt" }} />
                Ruta 5, Km 77, Villa Gral. Belgrano
              </IonCardSubtitle>
              <IonGrid>
                <IonRow>
                  <IonChip style={{ paddingRight: "16pt" }}>
                    <IonIcon icon={flash} />
                    &nbsp;Turismo alernativo
                  </IonChip>
                  <IonChip style={{ paddingRight: "16pt" }}>
                    <IonIcon icon={walk} />
                    &nbsp;Caminata
                  </IonChip>
                </IonRow>
                <IonRow>
                  <IonCol
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "start",
                      marginTop: "12pt",
                      paddingRight: "4pt",
                      paddingLeft: "4pt",
                    }}
                  >
                    <IonIcon style={{ fontSize: "16pt" }} icon={logoUsd} />
                    Gratis
                  </IonCol>
                  <IonCol
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "start",
                      marginTop: "12pt",
                      paddingRight: "4pt",
                      paddingLeft: "4pt",
                    }}
                  >
                    <IonIcon
                      style={{ fontSize: "16pt" }}
                      icon={radioButtonOff}
                    />
                    Dificultad baja
                  </IonCol>
                  <IonCol
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "start",
                      marginTop: "12pt",
                      paddingRight: "4pt",
                      paddingLeft: "4pt",
                    }}
                  >
                    <IonIcon style={{ fontSize: "16pt" }} icon={star} />
                    4.8
                  </IonCol>
                  <IonCol
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "start",
                      marginTop: "12pt",
                      paddingRight: "4pt",
                      paddingLeft: "4pt",
                    }}
                  >
                    <IonIcon style={{ fontSize: "16pt" }} icon={compass} />
                    Con guía
                  </IonCol>
                  <IonCol
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "start",
                      marginTop: "12pt",
                      paddingRight: "4pt",
                      paddingLeft: "4pt",
                    }}
                  >
                    <IonIcon style={{ fontSize: "16pt" }} icon={chatbox} />
                    225
                  </IonCol>
                </IonRow>
                <IonRow
                  style={{
                    display: "flex",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "12pt",
                  }}
                >
                  <IonButton fill="outline" color="success">
                    Guardar
                  </IonButton>
                  <IonButton>Reservar</IonButton>
                </IonRow>
              </IonGrid>
            </IonCardHeader>
            <IonCardContent></IonCardContent>
          </IonCard>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
