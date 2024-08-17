import { IonButton, IonIcon, IonTitle } from "@ionic/react";
import DefaultLoggedLayout from "../Layouts/DefaultLoggedLayout";
import { add } from "ionicons/icons";

export default function MyPlacesView() {
  return (
    <DefaultLoggedLayout>
      <IonTitle>Mis establecimientos</IonTitle>
      <IonButton style={{}}>
        {/* <IonIcon icon={add} /> */}
        Agregar un
        <br /> nuevo establecimiento
      </IonButton>
    </DefaultLoggedLayout>
  );
}
