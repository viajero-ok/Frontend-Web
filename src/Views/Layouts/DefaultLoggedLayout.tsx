import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import ProfileChip from "../../components/ProfileChip/ProfileChip";
import { useAuth } from "../../hooks/UseAuth/AuthProvider";
import { useEffect, useState } from "react";
import LoginNavbar from "../../components/LoginNavbar/LoginNavbar";

export default function DefaultLoggedLayout({ children }: any) {
  const [logged, setLogged] = useState<boolean>();
  const auth = useAuth();

  useEffect(() => {
    console.log("auth:", auth);
    if (auth) setLogged(auth.isLogged);
  }, [auth]);

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
            {auth && logged && <ProfileChip />}
            {auth && logged == false && <LoginNavbar />}
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
