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
import { PERFILES } from "../../App/consts/UsuarioConsts";

export default function DefaultLoggedLayout({ children }: any) {
  const [logged, setLogged] = useState<boolean>();
  const [perfilSeleccionado, setPerfilSeleccionado] = useState<number>();
  const auth = useAuth();
  const router = useIonRouter();

  const push = (uri: string) => {
    if (!router) return;
    router.push(uri);
  };

  useEffect(() => {
    if (auth) {
      setLogged(auth.isLogged);
      setPerfilSeleccionado(auth.perfilSeleccionado);
    }
  }, [auth]);

  return (
    <>
      {logged && (
        <IonMenu contentId="burger">
          <IonHeader>
            <IonToolbar>
              <IonTitle
                style={{
                  display: "flex",
                  position: "relative",
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
              {perfilSeleccionado === PERFILES.TURISTA.id ? (
                <>
                  <IonMenuToggle>
                    <IonItem button onClick={() => push("/")}>
                      Inicio
                    </IonItem>
                  </IonMenuToggle>
                  <IonMenuToggle>
                    <IonItem button onClick={() => push("/itinerary")}>
                      Mi Itinerario
                    </IonItem>
                  </IonMenuToggle>
                  <IonMenuToggle>
                    <IonItem button disabled>
                      Mis reservas
                    </IonItem>
                  </IonMenuToggle>
                </>
              ) : (
                <>
                  <IonMenuToggle>
                    <IonItem button onClick={() => push("/")}>
                      Inicio
                    </IonItem>
                  </IonMenuToggle>
                  <IonMenuToggle>
                    <IonItem button onClick={() => push("/my-places")}>
                      Mis establecimientos
                    </IonItem>
                  </IonMenuToggle>
                  <IonMenuToggle>
                    <IonItem button onClick={() => push("/my-offers")}>
                      Mis ofertas turísticas
                    </IonItem>
                  </IonMenuToggle>
                  <IonMenuToggle>
                    <IonItem button onClick={() => push("/mis-reservas")}>
                      Mis reservas
                    </IonItem>
                  </IonMenuToggle>
                  <IonMenuToggle>
                    <IonItem button disabled>
                      Reportes
                    </IonItem>
                  </IonMenuToggle>
                </>
              )}
            </IonList>
          </IonContent>
        </IonMenu>
      )}
      <IonPage id="burger">
        <IonHeader
          style={{ "webkit-box-shadow": "none", "box-shadow": "none" }}
          className="shadow-sm! border-b border-gray-100"
        >
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
              <div className="text-2xl">¡Hola, {}!</div>
            </div>
            <div className="flex justify-end mr-8">
              {auth && logged && <ProfileChip />}
              {auth && logged == false && <LoginNavbar />}
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
