import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function VisitorLayout({ children }: any) {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle
            style={{
              display: "flex",
              position: "absolute",
              float: "left",
              top: "calc(50% - 1.5pt)",
              transform: "translateY(-50%)",
              fontWeight: "bolder",
              fontSize: "21pt",
              marginLeft: "13pt",
            }}
          >
            viajero
          </IonTitle>
          <IonTitle
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translateX(-50%) translateY(-50%)",
            }}
          >
            ¡Hola, viajero!
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{children}</IonContent>
    </>
  );
}
