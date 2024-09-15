import {
  IonCard,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonHeader,
  IonRow,
} from "@ionic/react";

type TOfferTypeSelection = {
  setOfferType: (type: "alojamiento" | "actividad" | "evento") => void;
};
export default function OfferTypeSelection(props: TOfferTypeSelection) {
  return (
    <IonGrid
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IonCol>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "13pt",
          }}
        >
          <h1>Elegí el tipo de oferta que querés registrar</h1>
        </IonRow>
        <IonRow
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "13pt",
          }}
        >
          <IonCard button onClick={() => props.setOfferType("alojamiento")}>
            <IonHeader
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                padding: "13pt",
              }}
            >
              <img
                alt="Silhouette of mountains"
                src="public\3.5. Registro oferta\1-Alojamiento.png"
                width={"300pt"}
                height={"auto"}
                style={{}}
              />
              <IonCardTitle
                style={{
                  fontSize: "16pt",
                  fontWeight: "bold",
                  paddingTop: "13pt",
                }}
              >
                Alojamiento
              </IonCardTitle>
            </IonHeader>
          </IonCard>
          <IonCard
            button
            disabled
            onClick={() => props.setOfferType("actividad")}
          >
            <IonHeader
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                padding: "13pt",
              }}
            >
              <img
                alt="Silhouette of mountains"
                src="public\3.5. Registro oferta\2-Actividades.png"
                width={"300pt"}
                height={"auto"}
                style={{}}
              />
              <IonCardTitle
                style={{
                  fontSize: "16pt",
                  fontWeight: "bold",
                  paddingTop: "13pt",
                }}
              >
                Actividades
              </IonCardTitle>
            </IonHeader>
          </IonCard>
          <IonCard button disabled onClick={() => props.setOfferType("evento")}>
            <IonHeader
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                padding: "13pt",
              }}
            >
              <img
                alt="Silhouette of mountains"
                src="public\3.5. Registro oferta\3-Eventos.png"
                width={"300pt"}
                height={"auto"}
                style={{}}
              />
              <IonCardTitle
                style={{
                  fontSize: "16pt",
                  fontWeight: "bold",
                  paddingTop: "13pt",
                }}
              >
                Eventos
              </IonCardTitle>
            </IonHeader>
          </IonCard>
        </IonRow>
      </IonCol>
    </IonGrid>
  );
}
