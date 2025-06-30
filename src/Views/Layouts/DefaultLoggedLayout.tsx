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
            <div className="flex flex-row gap-4 text-gray-800 select-none h-full">
              <div onClick={() => router.push("/")} className="cursor-pointer px-2 hover:underline hover:bg-[var(--color-viajero)]/5 h-full flex items-center">Inicio</div>
              <div onClick={() => router.push("/my-places")} className="cursor-pointer px-2 hover:underline hover:bg-[var(--color-viajero)]/5 h-full flex items-center">Establecimientos</div>
              <div onClick={() => router.push("/my-offers")} className="cursor-pointer px-2 hover:underline hover:bg-[var(--color-viajero)]/5 h-full flex items-center">Ofertas</div>
              <div onClick={() => router.push("/mis-reservas")} className="cursor-pointer px-2 hover:underline hover:bg-[var(--color-viajero)]/5 h-full flex items-center">Reservas</div>
            </div>
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
        <IonContent className="">{children}</IonContent>
      </IonContent>
    </IonPage>
  );
}
