import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";

type TEstablecimientoCard = {
  nombre: string;
  descripcion: string;
};

export default function EstablecimientoCard(props: TEstablecimientoCard) {
  return (
    <IonCard style={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <IonGrid style={{ padding: 0, top: 0, position: "relative" }}>
        <IonRow>
          <IonCol size="auto">
            <IonRow>
              <img
                alt="Silhouette of mountains"
                src="https://ionicframework.com/docs/img/demos/card-media.png"
                width={"175pt"}
                height={"150pt"}
                style={{}}
              />
            </IonRow>
          </IonCol>
          <IonCol>
            <IonRow>
              <IonCardHeader style={{}}>
                <IonCardTitle>{props.nombre}</IonCardTitle>
                <IonCardSubtitle>{props.descripcion}</IonCardSubtitle>
              </IonCardHeader>
            </IonRow>
            <IonRow>
              <IonCardContent style={{}}>
                <IonButton
                  fill="outline"
                  style={{
                    "--border": "1pt solid #F08408",
                    "--border-color": "#F08408",
                    "--background": "transparent",
                    "--color": "#F08408",
                  }}
                >
                  VER
                </IonButton>
              </IonCardContent>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
}
