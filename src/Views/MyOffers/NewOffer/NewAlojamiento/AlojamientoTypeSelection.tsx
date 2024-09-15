import {
  IonButton,
  IonCard,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonHeader,
  IonRow,
} from "@ionic/react";

type TAlojamientoTypeSelection = {
  setOfferType: any;
  setAlojamientoType: any;
};
export default function AlojamientoTypeSelection(
  props: TAlojamientoTypeSelection
) {
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
          <IonButton
            color="light"
            onClick={() => props.setOfferType(null)}
            style={{ position: "absolute", float: "left", left: "21pt" }}
          >
            Volver
          </IonButton>
          <h1>Elegí el tipo de alojamiento que querés registrar</h1>
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
          <IonCard
            button
            onClick={() => props.setAlojamientoType("en-habitaciones")}
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
                src="public\3.6. Alojamientos\En habitaciones.png"
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
                En habitaciones
              </IonCardTitle>
            </IonHeader>
          </IonCard>
          <IonCard button disabled>
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
                src="public\3.6. Alojamientos\En unidades de vivienda.png"
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
                Unidades de vivienda
              </IonCardTitle>
            </IonHeader>
          </IonCard>
          <IonCard button disabled>
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
                src="public\3.6. Alojamientos\Casa de alquiler.png"
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
                Casa de alquiler
              </IonCardTitle>
            </IonHeader>
          </IonCard>
          <IonCard button disabled>
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
                src="public\3.6. Alojamientos\Camping.png"
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
                Camping
              </IonCardTitle>
            </IonHeader>
          </IonCard>
        </IonRow>
      </IonCol>
    </IonGrid>
  );
}
