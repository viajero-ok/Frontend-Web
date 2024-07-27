import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./Home.css";
import { getApi } from "../App/Default/DefaultService";

const Home: React.FC = () => {
  console.log("HOME")
  getApi()
    .then((response) => {
      console.log("Response: ", response);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Viajero</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent></IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
