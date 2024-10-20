import {
  IonButton,
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
import { clearJWT } from "../../App/Token";

export default function UncompleteLoggedLayout({ children }: any) {
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

  const handleCerrarSesion = () => {
    {
      if (!router) return;
      if (!auth) return;
      clearJWT();
      auth.logout();
    }
  };

  return (
    <>
      <IonMenu contentId="burger">
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
              viajero
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList lines="none" style={{ marginTop: "13pt" }}>
            <IonMenuToggle>
              <IonItem button onClick={() => push("/")} disabled>
                Inicio
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem button onClick={() => push("/my-places")} disabled>
                Mis establecimientos
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem button onClick={() => push("/my-offers")} disabled>
                Mis ofertas turísticas
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem button disabled>
                Mis reservas
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem button disabled>
                Informes y estadísticas
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonPage id="burger">
        <IonHeader>
          <IonToolbar>
            <IonMenuToggle
              slot="start"
              style={{ display: "inline-block", marginLeft: "13pt" }}
            >
              <IonMenuButton style={{ fontSize: "24pt" }}></IonMenuButton>
            </IonMenuToggle>
            <IonTitle
              style={{
                display: "flex",
                position: "absolute",
                float: "left",
                top: "calc(50% - 1.5pt)",
                transform: "translateY(-50%)",
                fontWeight: "bolder",
                fontSize: "21pt",
                marginLeft: "-13pt",
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
            <div
              style={{
                display: "flex",
                position: "relative",
                float: "right",
                marginRight: "31pt",
              }}
            >
              <IonButton color="light" onClick={() => handleCerrarSesion()}>
                Salir
              </IonButton>
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
    </>
  );
}
