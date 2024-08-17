import {
  IonAvatar,
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonPopover,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./Home.css";
import { getApi } from "../App/Default/DefaultService";
import { useAuth } from "../hooks/UseAuth/AuthProvider";
import { transform } from "ol/proj";
import ProfileChip from "../components/ProfileChip/ProfileChip";

const Home: React.FC = () => {
  console.log("HOME");
  getApi()
    .then((response) => {
      console.log("Response: ", response);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });

  const auth = useAuth();

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
        <IonContent></IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
