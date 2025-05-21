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
import { clearJWT } from "../../App/Token";
import { useAuth } from "../../hooks/UseAuth/AuthProvider";

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
              VIAJERO
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
              <IonItem button onClick={() => push("/mis-reservas")} disabled>
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
          <div className="grid grid-cols-3 h-[50pt]">
            <div className="flex flex-row items-center h-full text-gray-800">
              <IonMenuToggle
                slot="start"
                style={{ display: "inline-block", marginLeft: "13pt" }}
              >
                <IonMenuButton style={{ fontSize: "24pt" }}></IonMenuButton>
              </IonMenuToggle>
              <div className="text-xl font-bold w-fit">VIAJERO</div>
            </div>
            <div className="flex flex-row justify-center items-center">
              <div className="text-2xl">¡Hola, viajero!</div>
            </div>
            <div className="flex flex-row justify-end items-center">
              <IonButton className="mr-8 h-3/5" color="light" onClick={() => handleCerrarSesion()}>
                Salir
              </IonButton>
            </div>
          </div>
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
