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
import DefaultLoggedLayout from "../Views/Layouts/DefaultLoggedLayout";

const Home: React.FC = () => {
  const auth = useAuth();

  return (
    <DefaultLoggedLayout>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent></IonContent>
      </IonContent>
    </DefaultLoggedLayout>
  );
};

export default Home;
