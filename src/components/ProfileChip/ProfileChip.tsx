import {
  IonContent,
  IonItem,
  IonList,
  IonPopover,
  useIonRouter
} from "@ionic/react";
import { useState } from "react";
import { clearJWT } from "../../App/Token";
import { useAuth } from "../../Auth/Auth";
import { cn } from "../ui/Form/Field";

export default function ProfileChip(props: any) {
  const [open, setOpen] = useState<boolean>(false);
  const auth = useAuth();
  const router = useIonRouter();

  const handleCerrarSesion = () => {
    {
      if (!router) return;
      if (!auth) return;
      clearJWT();
      //auth.logout();
      router.push("/h");
    }
  };

  const handleCambiarPerfil = () => {
    if (!auth) return;
    console.log("llego");
    //auth.cambiarPerfil();
  };

  return (
    <div className="flex h-full items-center">
      <div
        id="chip"
        onClick={() => setOpen(true)}
        className={cn(
          "group flex flex-row items-center gap-2 bg-white p-1 px-4 h-full",
          "cursor-pointer hover:border-black hover:bg-[var(--color-viajero)]/5"
        )}
      >
        <div
          style={{
            backgroundImage: `url('https://ionicframework.com/docs/img/demos/avatar.svg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-[24pt] aspect-square rounded-full"
        />
        <div className="text-gray-800 group-hover:underline">{"Emiliano"}</div>
      </div>
      <IonPopover
        trigger="chip"
        isOpen={open}
        onIonPopoverDidDismiss={() => setOpen(false)}
        style={{}}
      >
        <IonContent class="ion-padding">
          <IonList lines="none">
            <IonItem button disabled onClick={() => handleCambiarPerfil()}>
              Cambiar perfil
            </IonItem>
            <IonItem button disabled>
              Editar perfil
            </IonItem>
            <IonItem button onClick={() => handleCerrarSesion()}>
              Cerrar sesión
            </IonItem>
          </IonList>
        </IonContent>
      </IonPopover>
    </div>
  );
}
