import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import LoginNavbar from "../../components/LoginNavbar/LoginNavbar";
import ProfileChip from "../../components/ProfileChip/ProfileChip";
import { useAuth } from "../../hooks/UseAuth/AuthProvider";

export default function VisitorLayout({ children }: any) {
  const [logged, setLogged] = useState<boolean>();
  const auth = useAuth();
  const router = useIonRouter();

  const push = (uri: string) => {
    if (!router) return;
    router.push(uri);
  };

  useEffect(() => {
    if (auth) setLogged(auth.isLogged);
  }, [auth]);

  return (
    <>
      <IonPage id="burger">
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
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Blank</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>{children}</IonContent>
        </IonContent>
      </IonPage>
    </>
  );
}
