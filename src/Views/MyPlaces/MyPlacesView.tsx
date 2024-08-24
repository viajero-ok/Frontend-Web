import { IonButton, IonContent, IonIcon, IonTitle } from "@ionic/react";
import DefaultLoggedLayout from "../Layouts/DefaultLoggedLayout";
import { add } from "ionicons/icons";

export default function MyPlacesView() {
  return (
    <DefaultLoggedLayout>
      <IonContent>
        <IonTitle>Mis establecimientos</IonTitle>
        <IonButton style={{}}>
          Agregar un
          <br /> nuevo establecimiento
        </IonButton>
      </IonContent>
    </DefaultLoggedLayout>
  );
}
