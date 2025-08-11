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
    <IonPage id="burger">
      <IonHeader
        style={{ "webkit-box-shadow": "none", "box-shadow": "none" }}
        className="shadow-sm! border-b border-gray-100"
      >
        <div className="grid grid-cols-2 h-[50pt] mx-8">
          <div className="flex flex-row items-center h-full gap-4">
            <div
              onClick={() => router.push("/")}
              className="select-none cursor-pointer text-2xl text-[var(--color-viajero)] font-bold w-fit"
            >
              VIAJERO
            </div>
            {/* <div className="text-lg italic font-light text-gray-600">¡Hola, {}viajero!</div> */}
          </div>
          <div className="flex flex-row gap-8 justify-end items-center pr-4">
            <div
              onClick={() => alert("todo: cerrar session")}
              className="cursor-pointer px-2 hover:underline hover:bg-[var(--color-viajero)]/5 h-full flex items-center"
            >
              Cerrar sesión
            </div>
          </div>
        </div>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="">{children}</IonContent>
      </IonContent>
    </IonPage>
  );
}
