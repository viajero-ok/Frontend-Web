import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ProfileChip from "../../components/ProfileChip/ProfileChip";

export default function DefaultLoggedLayout({ children }: any) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle
            style={{
              display: "flex",
              position: "absolute",
              float: "left",
              top: "50%",
              transform: "translateY(-50%)",
              fontWeight: "bolder",
              fontSize: "21pt",
              marginLeft: "13pt",
            }}
          >
            Viajero
          </IonTitle>
          <IonTitle
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translateX(-50%) translateY(-50%)",
            }}
          >
            ¡Hola, Viajero!
          </IonTitle>
          <div
            style={{
              display: "flex",
              position: "relative",
              float: "right",
              marginRight: "31pt",
            }}
          >
            <ProfileChip />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>{children}</IonContent>
      </IonContent>
    </IonPage>
  );
}
